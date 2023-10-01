import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { BUSINESS_TYPE } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { findBusinessById } from '../../utils/operations/readOperations';

export const setBusinessType = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <BUSINESS_TYPE>req.body;

		BUSINESS_TYPE.parse(requestBody);

		const businessID = req.params.businessID;

		const business = await findBusinessById(businessID);

		if (!business) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'BUSINESS_NOT_FOUND',
				message: 'Business information not found',
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
			code: 'BUSINESS_TYPE_UPDATED',
			message: 'Business information updated successfully',
			type: 'success',
			data: updatBusiness,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
