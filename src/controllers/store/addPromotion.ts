import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE } from '../../interfaces/types';
import { STORE_MSG } from '../../constants/api/messages';
import { PROMOTION } from '../../validations/store';
import { saveStorePromotion } from '../../services/app/store/storePromotions';

export const addPromotion = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		PROMOTION.parse(requestBody);

		const body = <PROMOTION>requestBody;

		const storeID = req.params.store_id;

		const cachedStore = await getCachedResult(storeID);

		const store = cachedStore
			? (cachedStore as STORE)
			: await findStoreById(storeID, { categories: true });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const createdPromo = await saveStorePromotion({ ...body, store: storeID });

		if (!createdPromo) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_CREATED.CODE,
				message: STORE_MSG.PROMO_NOT_CREATED.MESSAGE,
				type: 'error',
			});
		}

		cachResult(storeID, store);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PROMO_CREATED.CODE,
			message: STORE_MSG.PROMO_CREATED.MESSAGE,
			type: 'success',
			data: createdPromo,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
