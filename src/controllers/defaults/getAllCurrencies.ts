import { Request, Response } from 'express';
import { CURRENCY, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAvailableCurrencies } from '../../services/app/defaults/currencies';
import { DEFAULTS_MSG } from '../../constants/api/messages/defaults';
import { cachResult, getCachedResult } from '../../extensions/redis';

export const getAllCurrencies = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const cachedCurrencies = await getCachedResult('currencies-get-all');

		const currencies = cachedCurrencies
			? (cachedCurrencies as CURRENCY[])
			: await findAvailableCurrencies();

		cachedCurrencies ?? cachResult('currencies-get-all', currencies ?? [], 30);

		return res.status(STATUS.OK).json({
			code: DEFAULTS_MSG.AVAILABLE_CURRENCIES.CODE,
			message: DEFAULTS_MSG.AVAILABLE_CURRENCIES.MESSAGE,
			type: 'success',
			data: currencies ?? [],
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
