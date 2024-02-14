import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findOrderById } from '../../services/app/order/findOrder';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { ORDER_MSG } from '../../constants/api/messages';

export const getOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.order_id;

		const order = await findOrderById(orderID, { items: true });

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.ORDERS_FOUND.CODE,
				message: ORDER_MSG.ORDERS_FOUND.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.RETURNED_SUCCESSFULLY.CODE,
			message: ORDER_MSG.RETURNED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: order,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
