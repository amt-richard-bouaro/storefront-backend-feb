import { PRODUCT_MSG } from './../../constants/api/messages/product';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { UPDATE_DISCOUNTS } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { updateProductsDiscount } from '../../services/app/product/updateProduct';
import { findExistingProducts } from '../../services/app/product/findSingleProduct';

export const updateDiscounts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		UPDATE_DISCOUNTS.parse(requestBody);

		const body: UPDATE_DISCOUNTS = requestBody;

		const products = await findExistingProducts(body.products);

		if (!products || products.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.NOT_FOUND.CODE,
				message: PRODUCT_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const setNewDiscount = await updateProductsDiscount(
			products,
			body.discount
		);

		if (setNewDiscount.count === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.NOT_UPDATED.CODE,
				message: PRODUCT_MSG.NOT_UPDATED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.PRODUCT_ADD_SUCCESSFUL.CODE,
			message: PRODUCT_MSG.PRODUCT_ADD_SUCCESSFUL.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
