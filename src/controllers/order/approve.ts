import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { productsAvailability } from '../../services/app/product/productAvailable';
import { captureOrder } from '../../services/Paypal/payPalApi';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findOrderById } from '../../services/app/order/findOrder';

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
				code: 'PAYMENT_DENIED',
				message: 'Order not found.',
				type: 'error',
			});
		}

		if (order.status === 'Cancelled') {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_DENIED',
				message:
					'Order was cancelled. Payment cannot be accepted for cancelled order.',
				type: 'error',
			});
		}

		if (order.paid) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_DENIED',
				message: 'Currently not accepting any payment. Order paid for already',
				type: 'error',
			});
		}

		if (!order.items || order.items.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_DENIED',
				message: 'Order items empty',
				type: 'error',
			});
		}

		const storeProducts = order.storeOrder ? order.storeOrder.products : [];

		if (!storeProducts) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_DENIED',
				message: 'Order items empty',
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
				code: 'PAYMENT_DENIED',
				message: 'Could not process payment. Items not available',
				type: 'error',
				error: unavailbleProducts,
			});
		}

		const makePayment = await captureOrder(order.orderId);

		if (makePayment.status !== STATUS.CREATED) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_FAILED',
				message:
					'Error occurred while trying to process payment. Paypal could not process the payment.',
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
			code: 'PAYMENT_APPROVED',
			message: 'Payment made successfully',
			type: 'success',
			data: updateOrder,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
