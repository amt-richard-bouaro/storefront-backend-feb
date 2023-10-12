import { CUSTOMER_MSG } from './../../constants/api/messages';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { CUSTOMER } from '../../interfaces/types';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { z } from 'zod';
const CUSTOMER_ID = z.string().uuid();
export const getCustomer = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const customerID = CUSTOMER_ID.parse(req.params.customer_id);

		const cachedCustomer = await getCachedResult(customerID);

		const customer = cachedCustomer
			? (cachedCustomer as CUSTOMER)
			: await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult(customerID, customer);

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.CUSTOMER_FOUND.CODE,
			message: CUSTOMER_MSG.CUSTOMER_FOUND.MESSAGE,
			type: 'success',
			data: customer,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
