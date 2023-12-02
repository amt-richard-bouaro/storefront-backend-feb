import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { PROMOTION } from '../../interfaces/types/store';
import { findPromotionById } from '../../services/app/store/storePromotions';

export const getPromoProducts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const promoID = req.params.promo_id;

		const cachedPromoProducts = await getCachedResult(
			'promo-products' + promoID
		);

		const promoInfo = cachedPromoProducts
			? (cachedPromoProducts as PROMOTION)
			: await findPromotionById(promoID, { products: true });

		if (!promoInfo) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('promo-products' + promoID, promoInfo);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: promoInfo,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
