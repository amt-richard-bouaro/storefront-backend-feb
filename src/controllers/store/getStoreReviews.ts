import { STORE_MSG } from './../../constants/api/messages/store';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';

import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreReviewById } from '../../services/app/store/findStoreReview';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { REVIEW } from '../../interfaces/types';

export const getStoreReviews = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const cachedStoreReviews = await getCachedResult('store-reviews' + storeID);

		const reviews = cachedStoreReviews
			? (cachedStoreReviews as REVIEW[])
			: await findStoreReviewById(storeID);

		cachResult('store-reviews' + storeID, reviews);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: reviews,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
