import { Request, Response } from 'express';
import { ORDER_ITEM, RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { DELETE_ORDER_ITEM } from '../types';
import { updateOrder } from '../../../services/Paypal/payPalApi';
import { findOrderById } from '../../utils/operations/readOperations';

export const removeOrderItem = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		DELETE_ORDER_ITEM.parse(req.body);

		const orderID = req.params.order_id;

		const requestBody = <DELETE_ORDER_ITEM>req.body;

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

		const items: ORDER_ITEM[] = [];

		for (const id of requestBody.items) {
			const item = order.items.find((item) => item.id === id);
			item && items.push(item);
		}

		if (items.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message: 'Could not find any item that matches what was provided',
				type: 'error',
			});
		}

		if (order.items.length < 2 || order.items.length - items.length < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'UPDATE_DENIED',
				message:
					'Every Order must have at least one item. Items can no longer be deleted from this order. You might want to cancel the order instead.',
				type: 'error',
			});
		}

		const updatedOrderItem = await Database.$transaction(async (query) => {
			await query.orderItem.deleteMany({
				where: {
					id: {
						in: items.map((item) => item.id),
					},
				},
			});

			const newOrder = await findOrderById(order.id);

			const newTotal = await query.orderItem.aggregate({
				_sum: {
					total: true,
				},
				where: {
					order: newOrder?.id,
				},
			});

			return { newTotal, newOrder: newOrder?.items };
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
			data: updatedOrderItem.newOrder,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
