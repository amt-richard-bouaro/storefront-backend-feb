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
			data: temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
