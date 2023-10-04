import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findOrderById } from '../../services/app/order/findOrder';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getStoreOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.storeID;

		const order = await findOrderById(storeID, { items: true });

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDER_NOT_FOUND',
				message: 'Could not find order information',
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: 'ORDER_FOUND',
			message: 'Order detail successfully retreived',
			type: 'success',
			data: order,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
