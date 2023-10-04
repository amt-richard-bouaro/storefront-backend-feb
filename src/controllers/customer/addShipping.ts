import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { CUSTOMER_SHIPPING } from '../../validations/customer';
import { findCustomerById } from '../../services/app/customer/findCustomer';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const addShipping = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		CUSTOMER_SHIPPING.parse(requestBody);

		const customerID = req.params.customer_id;

		const customer = await findCustomerById(customerID);

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'CUSTOMER_NOT_FOUND',
				message: 'Could not find customer',
				type: 'error',
			});
		}

		await Database.shipping.create({
			data: {
				customer: customer.id,
				...requestBody,
			},
		});

		const updatedcustomer = await findCustomerById(customerID);
		return res.status(STATUS.OK).json({
			code: 'SHIPPING_ADDRESS_ADDED',
			message: 'Shipping address added',
			type: 'success',
			data: updatedcustomer?.shipping,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
