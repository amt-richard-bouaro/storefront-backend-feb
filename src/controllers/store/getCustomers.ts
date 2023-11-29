import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { CUSTOMER } from '../../interfaces/types';
// import { STORE_MSG } from '../../constants/api/messages';
import { Database } from '../../extensions/dbClient';
import { flatNestedObject } from '../../helpers';

export const getStoreCustomers = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;
		const cachedCustomers = await getCachedResult('store-customers' + storeID);

		const customerIDs = await Database.order.groupBy({
			by: ['customer'],
			where: {
				store: storeID,
			},
		});

		const IDs = customerIDs.map((customer) => customer.customer);

		const customerDetails = await Database.customer.findMany({
			where: {
				id: {
					in: IDs,
				},
			},
			include: {
				customerAccount: {
					select: {
						email: true,
					},
				},
			},
		});

		const customers = cachedCustomers
			? (cachedCustomers as CUSTOMER[])
			: customerDetails.map((customer) => flatNestedObject(customer));

		cachResult('store-customers' + storeID, customers);

		return res.status(STATUS.OK).json({
			code: 'STORE_CUSTOMERS_FOUND',
			message: 'Store customers found',
			type: 'success',
			data: customers,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
