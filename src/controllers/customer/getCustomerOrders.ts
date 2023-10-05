import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAllOrders } from '../../services/app/order/findAllOrders';

export const getCustomerOrders = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const orders = await findAllOrders(customerID, { items: true });

		if (!orders) {
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
			data: orders,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
