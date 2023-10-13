import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { findStoreById } from '../../services/app/store/findStore';
import { ERROR_MSG, STORE_MSG } from '../../constants/api/messages';
import { NEW_WALLET } from '../../validations/wallet';
import { createWallet } from '../../services/app/wallet/storeWallet';

export const addStoreWallet = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = req.body;

		NEW_WALLET.parse(requestBody);

		const body = <NEW_WALLET>requestBody;

		const storeID = req.params.store_id;

		const storeWithWallets = await findStoreById(storeID, { wallets: true });

		if (!storeWithWallets) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const walletExist = storeWithWallets.wallets?.find((wallet) => {
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

		const createdStoreWallet = await createWallet('Store', {
			...body,
			store: storeWithWallets.id,
		});

		if (!createdStoreWallet) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: ERROR_MSG.INTERNAL_SERVER_ERROR.CODE,
				message: ERROR_MSG.INTERNAL_SERVER_ERROR.MESSAGE,
				type: 'error',
			});
		}

		storeWithWallets.wallets?.push(createdStoreWallet);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.PAYMENT_INFO_ADDED.CODE,
			message: STORE_MSG.PAYMENT_INFO_ADDED.MESSAGE,
			type: 'success',
			data: createdStoreWallet,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
