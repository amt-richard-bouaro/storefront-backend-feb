import { CUSTOMER_MSG } from './../../constants/api/messages/customer';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { CUSTOMER_SHIPPING } from '../../validations/customer';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { addShippingInfo } from '../../services/app/customer/addShippingInfo';
import { cachResult } from '../../extensions/redis';

export const addShipping = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		CUSTOMER_SHIPPING.parse(requestBody);

		const customerID = req.params.customer_id;

		const customer = await findCustomerById(customerID, {});

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		await addShippingInfo(customer.id, { ...requestBody });

		const updatedcustomer = await findCustomerById(customerID, {
			shipping: true,
		});

		updatedcustomer?.shipping &&
			cachResult(
				'customer-shippings' + customerID,
				updatedcustomer?.shipping,
				15
			);
		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.SHIPPING_CREATED_SUCCESSFULLY.CODE,
			message: CUSTOMER_MSG.SHIPPING_CREATED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: updatedcustomer?.shipping,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
