import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { WALLET } from '../../interfaces/types';
import { findWallets } from '../../services/app/wallet/storeWallet';

export const getWallets = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const custORStoreID = req.params.store_id ?? req.params.customer_id;

		const cachedStoreWallets = await getCachedResult(
			'my-all-wallets' + custORStoreID
		);

		const Wallets = cachedStoreWallets
			? (cachedStoreWallets as WALLET[])
			: await findWallets(custORStoreID);

		if (!Wallets) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PAYMENT_INFO_NOT_FOUND.CODE,
				message: STORE_MSG.PAYMENT_INFO_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('my-all-wallets' + custORStoreID, Wallets);
		return res.status(STATUS.OK).json({
			code: STORE_MSG.PAYMENT_INFO_FOUND.CODE,
			message: STORE_MSG.PAYMENT_INFO_FOUND.MESSAGE,
			type: 'success',
			data: Wallets,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
