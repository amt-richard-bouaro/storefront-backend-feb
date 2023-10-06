import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { CHANGE_ORDER_ITEM_QUANTITY } from '../../validations/order';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { updateOrder } from '../../services/Paypal/payPalApi';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { ORDER_MSG } from '../../constants/api/messages';
import { findOrderById } from '../../services/app/order/findOrder';

export const updateItemQuantity = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CHANGE_ORDER_ITEM_QUANTITY.parse(req.body);

		const orderID = req.params.order_id;

		const requestBody = <CHANGE_ORDER_ITEM_QUANTITY>req.body;

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

		const item =
			order.items && order.items.find((item) => item.id === requestBody.id);

		if (!item) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ITEMS_NOT_FOUND.CODE,
				message: ORDER_MSG.ITEMS_NOT_FOUND.MESSAGE,
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
				currency: order.storeOrder ? order.storeOrder.currency : 'USD',
			}));

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.ITEMS_UPDATED.CODE,
			message: ORDER_MSG.ITEMS_UPDATED.MESSAGE,
			type: 'success',
			data: updatedOrderItem.orderItem,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
