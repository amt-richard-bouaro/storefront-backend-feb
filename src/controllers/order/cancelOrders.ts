import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { CANCEL_ORDERS } from '../../validations/order';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findCancelOrders } from '../../services/app/order/findOrder';
import { cancelManyOrders } from '../../services/app/order/cancelOrder';
import { ORDER_MSG } from '../../constants/api/messages';

export const cancelOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		CANCEL_ORDERS.parse(req.body);

		const requestBody = <CANCEL_ORDERS>req.body;

		const orders = await findCancelOrders(requestBody.orders);

		if (!orders || orders.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_CANCELLED.CODE,
				message: ORDER_MSG.NOT_CANCELLED.MESSAGE,
				type: 'error',
			});
		}

		const eligibleOrders: string[] = orders.map((order) => order.id);

		const cancelledOrders = await cancelManyOrders(eligibleOrders);

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.CANCELLED_SUCCESSFULLY.CODE,
			message: ORDER_MSG.CANCELLED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: { orders: cancelledOrders.count + ' orders canceled' },
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
