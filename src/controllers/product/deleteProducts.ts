import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { PRODUCTS_TO_DELETE } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findProductById } from '../../services/app/product/findSingleProduct';
import { deleteProductsById } from '../../services/app/product/deleteProductsById';
import { PRODUCT_MSG } from '../../constants/api/messages';

export const deleteProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <PRODUCTS_TO_DELETE>req.body;

		PRODUCTS_TO_DELETE.parse(requestBody);

		const qualifiedProducts: string[] = [];

		for (const product of requestBody.products) {
			const qualify = await findProductById(product, {});
			qualify && qualifiedProducts.push(qualify.id);
		}

		const deleted = await deleteProductsById(qualifiedProducts);

		if (!deleted || deleted.count < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.NOT_DELETED.CODE,
				message: PRODUCT_MSG.NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.DELETED.CODE,
			message: PRODUCT_MSG.DELETED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
