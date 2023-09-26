import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { CHANGE_ORDER_ITEM_QUANTITY } from '../types';
import { updateOrder } from '../../../services/Paypal/payPalApi';

export const updateItemQuantity = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CHANGE_ORDER_ITEM_QUANTITY.parse(req.body);

		const orderID = req.params.order_id;

		const requestBody = <CHANGE_ORDER_ITEM_QUANTITY>req.body;

		const order = await Database.order.findFirst({
			where: {
				id: orderID,
			},
			include: {
				items: true,
			},
		});

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message: 'Order was not found',
				type: 'error',
			});
		}

		if (order.status === 'Cancelled') {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message: 'Order was cancelled. Cannot update cancelled order.',
				type: 'error',
			});
		}

		if (order.paid) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message: 'Order has been processed. Cannot change quantities',
				type: 'error',
			});
		}

		const item = order.items.find((item) => item.id === requestBody.id);

		if (item === undefined) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message: 'The provided order item not found',
				type: 'error',
			});
		}

		const updatedOrderItem = await Database.$transaction(async (query) => {
			const orderItem = await query.orderItem.update({
				where: {
					id: requestBody.id,
				},
				data: {
					quantity: requestBody.quantity,
					total: Number(
						(
							requestBody.quantity * item.price -
							(item.discount / 100) * requestBody.quantity * item.price
						).toFixed(2)
					),
				},
			});

			const newTotal = await query.orderItem.aggregate({
				_sum: {
					total: true,
				},
				where: {
					order: order.id,
				},
			});

			return { newTotal, orderItem };
		});

		typeof updatedOrderItem.newTotal._sum.total === 'number' &&
			(await updateOrder({
				orderID: order.orderId,
				amount: updatedOrderItem.newTotal._sum.total,
				referenceId: order.referenceId,
			}));

		return res.status(STATUS.OK).json({
			code: 'PAYMENT',
			message: 'Payment intent',
			type: 'success',
			data: updatedOrderItem.orderItem,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
