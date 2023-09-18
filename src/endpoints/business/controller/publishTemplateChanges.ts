// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

export const publishTemplate = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const tempID = req.params.id;

		const temp = await Database.temp.findUnique({
			where: {
				id: tempID,
			},
		});

		const template = await Database.template.update({
			where: {
				id: temp.template,
			},
			data: {
				banner: temp.banner,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ONBOARDING_UPDATED',
			message: 'Business information updated successfully',
			type: 'success',
			data: template,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
