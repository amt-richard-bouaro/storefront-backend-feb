import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { BUSINESS_TYPE } from '../../validations/business';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { BUSINESS_MSG } from '../../constants/api/messages/business';

export const setBusinessType = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <BUSINESS_TYPE>req.body;

		BUSINESS_TYPE.parse(requestBody);

		const businessID = req.params.business_id;

		const business = await findBusinessById(businessID);

		if (!business) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: BUSINESS_MSG.BUSINESS_NOT_FOUND.CODE,
				message: BUSINESS_MSG.BUSINESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const updatBusiness = await Database.business.update({
			where: {
				id: businessID,
			},
			data: {
				businessType: requestBody.businessType,
			},
		});

		return res.status(STATUS.OK).json({
			code: BUSINESS_MSG.BUSINESS_INFORMATION_UPDATED_SUCCESSFULLY.CODE,
			message: BUSINESS_MSG.BUSINESS_INFORMATION_UPDATED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: updatBusiness,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
