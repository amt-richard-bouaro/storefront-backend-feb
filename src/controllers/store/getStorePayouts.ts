import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { findStorePayouts } from '../../services/app/store/findStorePayouts';

export const getStorePayouts = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const payouts = await findStorePayouts(storeID);

		if (!payouts) {
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
			data: payouts,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
