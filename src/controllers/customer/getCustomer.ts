import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getCustomer = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const id = req.params.customer_id;

		const customer = await findCustomerById(id);

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'CUSTOMER_NOT_FOUND',
				message: 'Could not find customer',
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: 'PAYMENT',
			message: 'Payment intent',
			type: 'success',
			data: customer,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
