import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import {
	findStoreById,
	findStoreProducts,
} from '../../services/app/store/findStore';
import { STORE_MSG } from '../../constants/api/messages';
import { groupVariations, getTotalRating, setDiscount } from '../../helpers';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { PRODUCT } from '../../interfaces/types';

export const getStoreProducts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const categoryQuery = req.query.category?.toString();

		const store = findStoreById(storeID, {});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const cachedResult = await getCachedResult(
			'store-product-on-sale' + storeID
		);

		const products = cachedResult
			? (cachedResult as PRODUCT[])
			: await findStoreProducts(storeID, {
					reviews: true,
					category: categoryQuery,
			  });

		const storeProducts = products
			? products.map((product) => {
					return {
						...product,
						discount: product.promotionProduct
							? setDiscount(product.discount, product.promotionProduct)
							: product.discount,
						variations: groupVariations(product.variations ?? []),
						rating: getTotalRating(product.reviews ?? []),
					};
			  })
			: [];

		cachResult('store-product-on-sale' + storeID, products);

		return res.status(STATUS.OK).json({
			code: 'STORE PRODUCTS FECTED',
			message: 'Store Products retrieved successfully',
			type: 'success',
			data: storeProducts,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
