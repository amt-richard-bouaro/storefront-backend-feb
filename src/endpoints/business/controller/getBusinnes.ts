// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { findBusinessById } from '../../utils/operations/readOperations';

export const getBusiness = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const businessID = req.params.id;

		const business = await findBusinessById(businessID);

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
