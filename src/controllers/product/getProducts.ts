import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { getTotalRating, groupVariations, setDiscount } from '../../helpers';
import { STORE_MSG } from '../../constants/api/messages';

export const getProducts = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, { products: true });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const products = store.products?.map((product) => {
			return {
				...product,
				discount: product.promotionProduct
					? setDiscount(product.discount, product.promotionProduct)
					: product.discount,
				variations: groupVariations(product.variations ?? []),
				rating: getTotalRating(product.reviews ?? []),
			};
		});

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PRODUCT_FOUND.CODE,
			message: STORE_MSG.PRODUCT_FOUND.MESSAGE,
			type: 'success',
			data: products,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
