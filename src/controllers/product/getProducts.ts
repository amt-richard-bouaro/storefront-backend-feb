import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { getTotalRating, groupVariations } from '../../helpers';


export const getProducts = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, { products: true });

		if (!store) {
			return res.status(STATUS.OK).json({
				code: 'STORE_NOT_FOUND',
				message: 'Store not found',
				type: 'error',
			});
		}

		const products = store.products?.map((product) => {
			return {
				...product,
				variations: groupVariations(product.variations ?? []),
				rating: getTotalRating(product.reviews ?? []),
			};
		});

		return res.status(STATUS.OK).json({
			code: 'ALL_PRODUCTS',
			message: 'Products retrieved',
			type: 'success',
			data: products,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
