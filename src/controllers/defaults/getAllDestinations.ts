import { Request, Response } from 'express';
import { CURRENCY, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { DEFAULTS_MSG } from '../../constants/api/messages/defaults';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { findAvailableDestinations } from '../../services/app/defaults/destinations';

export const getAllDestinations = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const cachedDestinations = await getCachedResult('destinations-get-all');

		const destinations = cachedDestinations
			? (cachedDestinations as CURRENCY[])
			: await findAvailableDestinations();

		cachedDestinations ??
			cachResult('destinations-get-all', destinations ?? [], 30);

		return res.status(STATUS.OK).json({
			code: DEFAULTS_MSG.AVAILABLE_DESTINATIONS.CODE,
			message: DEFAULTS_MSG.AVAILABLE_DESTINATIONS.MESSAGE,
			type: 'success',
			data: destinations ?? [],
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
