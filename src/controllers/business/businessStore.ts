import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getBusinessStores = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const businessID = req.params.business_id;

		const business = await findBusinessById(businessID);

		return res.status(STATUS.OK).json({
			code: 'BUSINESS_DATA',
			message: 'Business information successfully retrieved',
			type: 'success',
			data: business?.stores,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
