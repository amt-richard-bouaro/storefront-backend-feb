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
		const requestBody = req.body;

		const productID = req.params.product_id;

		const body: NEW_PRODUCT = JSON.parse(requestBody);

		NEW_PRODUCT.parse(body);

		const product = await findProductById(productID, {});

		if (!product) {
			return res.status(STATUS.OK).json({
				code: PRODUCT_MSG.NOT_FOUND.CODE,
				message: PRODUCT_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatedProduct = updateProductById(productID, {
			name: body.name,
			category: body.category,
			price: body.price,
			description: body.description,
			isActive: body.isActive,
			quantity: body.quantity,
			discount: body.discount ?? product?.discount,
		});

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.PRODUCT_ADD_SUCCESSFUL.CODE,
			message: PRODUCT_MSG.PRODUCT_ADD_SUCCESSFUL.MESSAGE,
			type: 'success',
			data: updatedProduct,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
