import { CUSTOMER_MSG } from '../../constants/api/messages';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findCustomerSavedProducts } from '../../services/app/customer/viewedProducts';
import { LIKED_PRODUCT } from '../../interfaces/types/product';

export const getFavoriteProducts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const idOnly = req.query.idOnly;

		const likedOnly = req.query.likedOnly;

		const savedProducts = await findCustomerSavedProducts(customerID);

		if (!savedProducts) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.SAVED_PRODUCTS_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.SAVED_PRODUCTS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const savedProductIds: string[] = [];

		if (idOnly && idOnly === 'true' && !likedOnly) {
			savedProducts.forEach((item) => {
				if (item.savedProduct && item.liked) {
					savedProductIds.push(item.savedProduct?.id);
				}
			});
		}

		const likedProducts: LIKED_PRODUCT[] = [];

		if (likedOnly && likedOnly === 'true' && !idOnly) {
			savedProducts.forEach((item) => {
				if (item.liked === true) {
					likedProducts.push(item.savedProduct);
				}
			});
		}

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.SAVED_PRODUCTS_FOUND.CODE,
			message: CUSTOMER_MSG.SAVED_PRODUCTS_FOUND.MESSAGE,
			type: 'success',
			data:
				idOnly && idOnly === 'true' && !likedOnly
					? savedProductIds
					: likedOnly && likedOnly === 'true' && !idOnly
					? likedProducts
					: savedProducts.map((product) => product.savedProduct),
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
