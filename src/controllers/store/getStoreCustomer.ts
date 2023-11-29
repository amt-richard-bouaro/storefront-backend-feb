import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { CUSTOMER } from '../../interfaces/types';
// import { STORE_MSG } from '../../constants/api/messages';
import { Database } from '../../extensions/dbClient';

export const getStoreCustomer = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;
		const customerID = req.params.customer_id;

		const cachedCustomers = await getCachedResult('store-customer' + storeID);

		const customerDetails = await Database.customer.findFirst({
			where: {
				id: customerID,
			},
			include: {
				customerAccount: {
					select: {
						email: true,
					},
				},
				orders: {
					where: {
						store: storeID,
					},
					include: {
						items: true,
						orderShipping: {
							select: {
								countryCode: true,
								postalCode: true,
								name: true,
								phone: true,
								city: true,
								apartmentNo: true,
								streetAddress: true,
								id: true,
							},
						},
					},
				},
			},
		});

		const customer = cachedCustomers
			? (cachedCustomers as CUSTOMER)
			: customerDetails;

		customer && cachResult('store-customer' + storeID, customer);

		return res.status(STATUS.OK).json({
			code: 'STORE_CUSTOMER_FOUND',
			message: 'Store customer found',
			type: 'success',
			data: customer,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
