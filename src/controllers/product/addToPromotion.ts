import { PRODUCT_MSG } from './../../constants/api/messages/product';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { UPDATE_PRODUCT_PROMOTION } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import {
	findPromotionById,
	setPromoProduct,
} from '../../services/app/store/storePromotions';
import { STORE_MSG } from '../../constants/api/messages';

export const addProductsToPromo = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		UPDATE_PRODUCT_PROMOTION.parse(requestBody);

		const body = <UPDATE_PRODUCT_PROMOTION>requestBody;

		const promoID = req.params.promo_id;

		const promotion = await findPromotionById(promoID);

		if (!promotion) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_FOUND.CODE,
				message: STORE_MSG.PROMO_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		if (promotion.end < new Date()) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_ENDED.CODE,
				message: STORE_MSG.PROMO_ENDED.MESSAGE,
				type: 'error',
			});
		}

		const updateProducts = await setPromoProduct(promoID, body);

		if (updateProducts.count === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.PRODUCTS_NOT_UPDATED.CODE,
				message: PRODUCT_MSG.PRODUCTS_NOT_UPDATED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.PRODUCTS_UPDATED.CODE,
			message: PRODUCT_MSG.PRODUCTS_UPDATED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
