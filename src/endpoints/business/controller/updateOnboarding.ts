import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { ONBOARDING } from '../../business/types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const updateOnboarding = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <ONBOARDING>req.body;

		ONBOARDING.parse(requestBody);

		const businessID = req.params.id;

		const business = await Database.business.update({
			where: {
				id: businessID,
			},
			data: {
				businessType: requestBody.businessType,
				websiteType: requestBody.websiteType,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ONBOARDING_UPDATED',
			message: 'Business information updated successfully',
			type: 'success',
			data: business,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
