import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { findOrderById } from '../../utils/operations/readOperations';

export const getOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const orderID = req.params.order_id;

		const order = await findOrderById(orderID, { items: true });

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
