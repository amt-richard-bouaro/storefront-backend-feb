import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { DELETE_ORDER_ITEM } from '../../validations/order';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { ORDER_ITEM } from '../../interfaces/types';
import { findOrderById } from '../../services/app/order/findOrder';
import { updateOrder } from '../../services/Paypal/payPalApi';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { ORDER_MSG } from '../../constants/api/messages';

export const removeOrderItem = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		DELETE_ORDER_ITEM.parse(req.body);

		const orderID = req.params.order_id;

		const requestBody = <DELETE_ORDER_ITEM>req.body;

		const order = await findOrderById(orderID, {
			items: true,
			storeOrder: true,
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
				message: `${ORDER_MSG.ALREADY_FULFILLED.MESSAGE} Cannot change quantities`,
				type: 'error',
			});
		}

		const items: ORDER_ITEM[] = [];

		if (order.items) {
			for (const id of requestBody.items) {
				const item = order.items.find((item) => item.id === id);
				item && items.push(item);
			}
		}

		if (items.length === 0 || !order.items) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_FOUND.CODE,
				message: ORDER_MSG.ITEMS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		if (order.items.length < 2 || order.items.length - items.length < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_REMOVED.CODE,
				message: ORDER_MSG.ITEMS_NOT_REMOVED.MESSAGE,
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
				currency: order.storeOrder ? order.storeOrder.currency : 'USD',
			}));

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.ITEMS_UPDATED.CODE,
			message: ORDER_MSG.ITEMS_UPDATED.MESSAGE,
			type: 'success',
			data: updatedOrderItem.newOrder,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
