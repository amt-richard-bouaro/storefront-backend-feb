import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { CUSTOMER_MSG } from '../../constants/api/messages';

export const getCustomerShippings = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const id = req.params.customer_id;

		const customer = await findCustomerById(id, { shipping: true });

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.SHIPPINGS_INFO.CODE,
			message: CUSTOMER_MSG.SHIPPINGS_INFO.MESSAGE,
			type: 'success',
			data: customer.shipping,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
