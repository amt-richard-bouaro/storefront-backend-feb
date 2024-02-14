import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';

import {
	findPromotionById,
	removePromoProduct,
} from '../../services/app/store/storePromotions';
import { REMOVE_PROMO_ITEM } from '../../validations/store';

export const removePromoItem = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		const promoID = req.params.promo_id;

		REMOVE_PROMO_ITEM.parse(requestBody);

		const { products } = <REMOVE_PROMO_ITEM>requestBody;

		const promotion = await findPromotionById(promoID, { products: true });

		if (!promotion) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_NOT_FOUND.CODE,
				message: STORE_MSG.PROMO_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const productsToBeDeleted: string[] = [];
		promotion.products
			? promotion.products.filter((item) => {
					if (products.includes(item.id)) {
						productsToBeDeleted.push(item.id);
					}
			  })
			: [];

		if (productsToBeDeleted.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PROMO_PRODUCT_NOT_REMOVED.CODE,
				message: STORE_MSG.PROMO_PRODUCT_NOT_REMOVED.MESSAGE,
				type: 'error',
			});
		}

		await removePromoProduct(promoID, productsToBeDeleted);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PROMO_PRODUCT_REMOVED.CODE,
			message: STORE_MSG.PROMO_PRODUCT_REMOVED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
