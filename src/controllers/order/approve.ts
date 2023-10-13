import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { productsAvailability } from '../../services/app/product/productAvailable';
import { captureOrder } from '../../services/Paypal/payPalApi';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findOrderById } from '../../services/app/order/findOrder';
import { ORDER_MSG } from '../../constants/api/messages';

export const approveOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.orderID;

		const order = await findOrderById(orderID, {
			storeOrder: true,
			items: true,
			products: true,
		});

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		if (order.status === 'Cancelled') {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ALREADY_CANCELLED.CODE,
				message: ORDER_MSG.ALREADY_CANCELLED.MESSAGE,
				type: 'error',
			});
		}

		if (order.paid) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ALREADY_FULFILLED.CODE,
				message: ORDER_MSG.ALREADY_FULFILLED.MESSAGE,
				type: 'error',
			});
		}

		if (!order.items || order.items.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_FOUND.CODE,
				message: ORDER_MSG.ITEMS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const storeProducts = order.storeOrder ? order.storeOrder.products : [];

		if (!storeProducts) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_FOUND.CODE,
				message: ORDER_MSG.ITEMS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const orderItems = order.items.map((item) => {
			return {
				product: item.product,
				quantity: item.quantity,
				variations: [],
			};
		});

		const { unavailbleProducts } = productsAvailability(
			storeProducts,
			orderItems
		);

		if (unavailbleProducts.length > 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_FOUND.CODE,
				message: ORDER_MSG.ITEMS_NOT_FOUND.MESSAGE,
				type: 'error',
				error: unavailbleProducts,
			});
		}

		const makePayment = await captureOrder(order.orderId);

		if (makePayment.status !== STATUS.CREATED) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.PAYMENT_FAILED.CODE,
				message: ORDER_MSG.PAYMENT_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const updateOrder = await Database.$transaction(async (query) => {
			for (const item of orderItems) {
				await query.product.update({
					where: {
						id: item.product,
					},
					data: {
						quantity: {
							decrement: item.quantity,
						},
					},
				});
			}

			const update = await query.order.update({
				where: {
					id: order.id,
				},
				data: {
					status: 'Processing',
					paid: true,
				},
			});

			return update;
		});

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.PLACED_SUCCESSFULLY.CODE,
			message: ORDER_MSG.PLACED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: updateOrder,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
