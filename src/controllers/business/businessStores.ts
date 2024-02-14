import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { BUSINESS_MSG } from '../../constants/api/messages/business';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { BUSINESS } from '../../interfaces/types';

export const getBusinessStores = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const businessID = req.params.business_id;

		const cachedBusiness = await getCachedResult(
			'business-stores' + businessID
		);

		const business = cachedBusiness
			? (cachedBusiness as BUSINESS)
			: await findBusinessById(businessID, { stores: true, template: true });

		if (!business) {
			return res.status(STATUS.OK).json({
				code: BUSINESS_MSG.BUSINESS_NOT_FOUND.CODE,
				message: BUSINESS_MSG.BUSINESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('business-stores' + businessID, business, 15);

		return res.status(STATUS.OK).json({
			code: BUSINESS_MSG.BUSINESS_STORES_FOUND.CODE,
			message: BUSINESS_MSG.BUSINESS_STORES_FOUND.MESSAGE,
			type: 'success',
			data: business?.stores,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
