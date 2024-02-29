import { PRODUCT_MSG } from './../../constants/api/messages/product';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { NEW_PRODUCT } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { updateProductById } from '../../services/app/product/updateProduct';
import { findProductById } from '../../services/app/product/findSingleProduct';

export const updateProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const productID = req.params.product_id;

		const body: NEW_PRODUCT = NEW_PRODUCT.parse(req.body);

		const product = await findProductById(productID, {});

		if (!product) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.NOT_FOUND.CODE,
				message: PRODUCT_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatedProduct = await updateProductById(productID, {
			name: body.name,
			category: body.category,
			price: body.price,
			description: body.description,
			isActive: body.isActive,
			quantity: body.quantity,
			discount: body.discount ?? product?.discount,
		});

		if (!updatedProduct) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: PRODUCT_MSG.PRODUCTS_NOT_UPDATED.CODE,
				message: PRODUCT_MSG.PRODUCTS_NOT_UPDATED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.PRODUCT_UPDATED.CODE,
			message: PRODUCT_MSG.PRODUCT_UPDATED.MESSAGE,
			type: 'success',
			data: updatedProduct,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
