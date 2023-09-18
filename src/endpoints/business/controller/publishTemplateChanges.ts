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
				name: req.body,
				brandImage: req.body,
				brandColor: req.body,
				welcomeColor: req.body,
				welcomebtnText: req.body,
				welcomeText: req.body,
				fontstyle: req.body,
				primaryColor: req.body,
				secondaryColor: req.body,
				auxillaryColor: req.body,
				storeStory: req.body,
				hasContactPage: req.body,
				hasAboutPage: req.body,
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
