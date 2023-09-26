import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

import { captureOrder } from '../../../services/Paypal/payPalApi';
import { productsAvailability } from '../../utils/helperFunctions';

export const approveOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.orderID;

		const order = await Database.order.findFirst({
			where: {
				orderId: orderID,
			},
			include: {
				items: true,
				storeOrder: {
					include: {
						products: true,
					},
				},
			},
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

		if (order.items.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_DENIED',
				message: 'Order items empty',
				type: 'error',
			});
		}

		const storeProducts = order.storeOrder.products ?? [];

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

		const makePayment = await captureOrder(orderID);

		if (makePayment.status !== STATUS.OK) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'PAYMENT_FAILED',
				message: 'Could not process payment.',
				type: 'error',
			});
		}

		for (const item of orderItems) {
			await Database.product.update({
				where: {
					id: item.product,
				},
				data: {
					quantity: {
						decrement: item.quantity,
					},
				},
			});

			await Database.order.update({
				where: {
					id: order.id,
				},
				data: {
					status: 'Processing',
					paid: true,
				},
			});
		}

		return res.status(STATUS.OK).json({
			code: 'PAYMENT',
			message: 'Payment made successfully',
			type: 'success',
			data: makePayment.json,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
