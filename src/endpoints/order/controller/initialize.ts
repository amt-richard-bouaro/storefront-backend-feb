// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
// import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import {
	findAccountById,
	findCustomerById,
	findStoreById,
} from '../../utils/operations/readOperations';
import { ITEMS_TO_BUY, ITEMS_TO_BUY_TYPE } from '../types';
import { productsAvailability } from '../../utils/helperFunctions';
// import { createOrder } from '../../../services/Paypal/payPalApi';

export const initializeOrder = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	console.log(req.body);

	try {
		ITEMS_TO_BUY.parse(req.body);

		const requestBody = <ITEMS_TO_BUY_TYPE>req.body;

		// const { id } = <REQUEST_WITH_USER>req.user;

		const storeID = req.params.storeID;

		const user = await findAccountById('68f815fd-4bae-46a7-9bdd-1002b0994108');

		const customer = user && (await findCustomerById(user.id));

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'CUSTOMER_NOT_FOUND',
				message: 'Could not find customer',
				type: 'error',
			});
		}

		const store = await findStoreById(storeID);

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'STORE_NOT_FOUND',
				message: 'Could not find store',
				type: 'error',
			});
		}

		const storeProducts = store.products !== undefined ? store.products : [];

		const { unavailbleProducts, availableProducts } = productsAvailability(
			storeProducts,
			requestBody.items
		);

		if (unavailbleProducts.length > 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDER_FAILED',
				message: 'Could not find products',
				type: 'error',
				error: unavailbleProducts,
			});
		}

		console.log(availableProducts);

		// const email = user.email;
		// const amount = totalAmountToPay(storeProducts, requestBody.items);

		// const response = await createOrder(requestBody.items);

		// const response2 = await captureOrder('1VN97308V5756290L');

		return res.status(STATUS.OK).json({
			code: 'PAYMENT',
			message: 'Payment intent',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
