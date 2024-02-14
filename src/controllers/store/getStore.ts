import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { STORE } from '../../interfaces/types';
// import { groupVariations, getTotalRating, setDiscount } from '../../helpers';

export const getStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const cachedResult = await getCachedResult('get-stores' + storeID);

		const store = cachedResult
			? (cachedResult as STORE)
			: await findStoreById(storeID, {
					template: true,
					// products: true,
					reviews: true,
					reply: true,
			  });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('get-stores' + storeID, store, 15);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: store,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
