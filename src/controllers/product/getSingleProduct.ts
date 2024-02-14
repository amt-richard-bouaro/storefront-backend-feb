import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findProductById } from '../../services/app/product/findSingleProduct';
import { PRODUCT_MSG, STORE_MSG } from '../../constants/api/messages';
import { getTotalRating, groupVariations, setDiscount } from '../../helpers';

export const getSingleProduct = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const productID = req.params.product_id;

		const product = await findProductById(productID, {
			variations: true,
			reviews: true,
			images: true,
			replies: true,
		});

		if (!product) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.NOT_FOUND.CODE,
				message: PRODUCT_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const newProduct = {
			...product,
			discount: product.promotionProduct
				? setDiscount(product.discount, product.promotionProduct)
				: product.discount,
			variations: groupVariations(product.variations ?? []),
			rating: getTotalRating(product.reviews ?? []),
		};

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PRODUCT_FOUND.CODE,
			message: STORE_MSG.PRODUCT_FOUND.MESSAGE,
			type: 'success',
			data: newProduct,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
