import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { findPromotions } from '../../services/app/store/storePromotions';
import { findStoreById } from '../../services/app/store/findStore';

export const getStorePromotions = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, {});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const promotions = await findPromotions(storeID, {});

		if (!promotions) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_FOUND.CODE,
				message: STORE_MSG.PROMO_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PROMO_FOUND.CODE,
			message: STORE_MSG.PROMO_FOUND.MESSAGE,
			type: 'success',
			data: promotions,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
