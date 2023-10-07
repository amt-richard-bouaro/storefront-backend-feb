import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE } from '../../interfaces/types';
import { ERROR_MSG, STORE_MSG } from '../../constants/api/messages';
import { NEW_WALLET } from '../../validations/wallet';
import { createWallet } from '../../services/app/wallet/storeWallet';

export const addStoreWallet = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		NEW_WALLET.parse(requestBody);

		const body = <NEW_WALLET>requestBody;

		const storeID = req.params.store_d;

		const cachedStoreWallet = await getCachedResult('my-all-wallets' + storeID);

		const storeWallets = cachedStoreWallet
			? (cachedStoreWallet as STORE)
			: await findStoreById(storeID, { wallets: true });

		if (!storeWallets) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const walletExist = storeWallets.wallets?.find((wallet) => {
			if (wallet.walletId === body.walletId && wallet.method === body.method) {
				return wallet;
			}
		});

		if (walletExist) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.PAYMENT_ALREAD_EXIST.CODE,
				message: STORE_MSG.PAYMENT_ALREAD_EXIST.MESSAGE,
				type: 'error',
			});
		}

		const createdWallet = await createWallet('Store', body);

		if (!createdWallet) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: ERROR_MSG.INTERNAL_SERVER_ERROR.CODE,
				message: ERROR_MSG.INTERNAL_SERVER_ERROR.MESSAGE,
				type: 'error',
			});
		}

		storeWallets.wallets?.push(createdWallet);

		cachResult('my-all-wallets' + storeID, storeWallets);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PAYMENT_INFO_ADDED.CODE,
			message: STORE_MSG.PAYMENT_INFO_ADDED.MESSAGE,
			type: 'success',
			data: createdWallet,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
