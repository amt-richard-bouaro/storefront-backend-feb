import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { BUSINESS_TYPE } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const setBusinessType = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <BUSINESS_TYPE>req.body;

		BUSINESS_TYPE.parse(requestBody);

		const businessID = req.params.businessID;

		const business = await Database.business.update({
			where: {
				id: businessID,
			},
			data: {
				businessType: requestBody.businessType,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'BUSINESS_TYPE_UPDATED',
			message: 'Business information updated successfully',
			type: 'success',
			data: business,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
