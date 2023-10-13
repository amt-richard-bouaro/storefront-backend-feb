import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { STORE_MSG } from '../../constants/api/messages';
import { PROMOTION } from '../../validations/store';
import {
	findPromotionById,
	updateStorePromotion,
} from '../../services/app/store/storePromotions';

export const updatedPromotion = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		PROMOTION.parse(requestBody);

		const body = <PROMOTION>requestBody;

		const promoID = req.params.promo_id;

		const promotion = findPromotionById(promoID);

		if (!promotion) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatePromo = await updateStorePromotion(promoID, body);

		if (!updatePromo) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_CREATED.CODE,
				message: STORE_MSG.PROMO_NOT_CREATED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PROMO_CREATED.CODE,
			message: STORE_MSG.PROMO_CREATED.MESSAGE,
			type: 'success',
			data: updatePromo,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
