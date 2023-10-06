import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE_MSG } from '../../constants/api/messages';
import { groupVariations } from '../../helpers';
import { getCachedResult } from '../../extensions/redis';
import { STORE } from '../../interfaces/types';

export const getStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const cachedStore = await getCachedResult(storeID);

		const store = cachedStore
			? (cachedStore as STORE)
			: await findStoreById(storeID, {
					template: true,
					products: true,
					reviews: true,
			  });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const newStore = store
			? {
					...store,
					products:
						store.products &&
						store.products.map((product) => {
							return {
								...product,
								variations: groupVariations(product.variations ?? []),
							};
						}),
			  }
			: [];

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: newStore,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
