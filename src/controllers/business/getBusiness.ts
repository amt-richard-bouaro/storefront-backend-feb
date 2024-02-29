import { cachResult, getCachedResult } from '../../extensions/redis';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { BUSINESS_MSG } from '../../constants/api/messages/business';
import { BUSINESS } from '../../interfaces/types';

export const getBusiness = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const businessID = req.params.business_id;

		const cachedBusiness = await getCachedResult(businessID);

		const business = cachedBusiness
			? (cachedBusiness as BUSINESS)
			: await findBusinessById(businessID, { stores: true });

		if (!business) {
			return res.status(STATUS.NOT_FOUND).json({
				code: BUSINESS_MSG.BUSINESS_NOT_FOUND.CODE,
				message: BUSINESS_MSG.BUSINESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult(businessID, business, 15);

		return res.status(STATUS.OK).json({
			code: BUSINESS_MSG.BUSINESS_FOUND.CODE,
			message: BUSINESS_MSG.BUSINESS_FOUND.MESSAGE,
			type: 'success',
			data: business,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
