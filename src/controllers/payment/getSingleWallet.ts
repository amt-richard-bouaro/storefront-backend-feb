import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { findSingleWallet } from '../../services/app/wallet/storeWallet';

export const getSingleWallet = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const custORStoreID = req.params.store_id ?? req.params.customer_id;

		const method = req.query.method;

		let getMethod: 'Card' | 'Paypal' = 'Paypal';

		if (!method || method === 'Paypal') {
			getMethod = 'Paypal';
		} else if (method === 'Card') {
			getMethod = 'Card';
		}

		const Wallet = await findSingleWallet(custORStoreID, getMethod);

		if (!Wallet) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PAYMENT_INFO_NOT_FOUND.CODE,
				message: STORE_MSG.PAYMENT_INFO_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PAYMENT_INFO_FOUND.CODE,
			message: STORE_MSG.PAYMENT_INFO_FOUND.MESSAGE,
			type: 'success',
			data: Wallet,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
