// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import { TEMPLATE } from '../types';

export const saveTemplate = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const tempID = req.params.id;

		TEMPLATE.parse(req.body);

		const temp = await Database.temp.update({
			where: {
				id: tempID,
			},
			data: {
				banner: req.body.banner,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ONBOARDING_UPDATED',
			message: 'Business information updated successfully',
			type: 'success',
			data: temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
