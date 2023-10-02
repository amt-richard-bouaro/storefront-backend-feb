import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { CUSTOMER_SHIPPING } from '../types';
import { findCustomerById } from '../../utils/operations/readOperations';

export const addShipping = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		CUSTOMER_SHIPPING.parse(requestBody);

		// const { id } = <REQUEST_WITH_USER>req.user;
		const customerID = req.params.customerID;

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
