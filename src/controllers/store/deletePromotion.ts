import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { ORDER_MSG, STORE_MSG } from '../../constants/api/messages';
import {
	deletePromo,
	findPromotionById,
} from '../../services/app/store/storePromotions';

export const deletePromotion = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const promoID = req.params.promo_id;

		const promotion = await findPromotionById(promoID);

		if (!promotion) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_RETURNED.CODE,
				message: ORDER_MSG.NOT_RETURNED.MESSAGE,
				type: 'error',
			});
		}

		const deletedPromo = await deletePromo(promoID);

		if (!deletedPromo) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_DELETED.CODE,
				message: STORE_MSG.PROMO_NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PROMO_DELETED.CODE,
			message: STORE_MSG.PROMO_DELETED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
