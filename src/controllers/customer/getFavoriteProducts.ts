import { CUSTOMER_MSG } from './../../constants/api/messages';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { SAVED_ITEM } from '../../interfaces/types';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { findCustomerSavedProducts } from '../../services/app/customer/viewedProducts';

export const getFavoriteProducts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const cachedCustomerFavorites = await getCachedResult(
			'saved-products' + customerID
		);

		const savedProducts = cachedCustomerFavorites
			? (cachedCustomerFavorites as SAVED_ITEM)
			: await findCustomerSavedProducts(customerID);

		if (!savedProducts) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.SAVED_PRODUCTS_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.SAVED_PRODUCTS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('saved-products' + customerID, savedProducts);

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.SAVED_PRODUCTS_FOUND.CODE,
			message: CUSTOMER_MSG.SAVED_PRODUCTS_FOUND.MESSAGE,
			type: 'success',
			data: savedProducts,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
