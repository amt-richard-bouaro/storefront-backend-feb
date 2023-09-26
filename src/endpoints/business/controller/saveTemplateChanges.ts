// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import { TEMPLATE } from '../types';

export const saveTemplate = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const tempID = req.params.tempID;

		TEMPLATE.parse(req.body);

		const temp = await Database.temp.update({
			where: {
				id: tempID,
			},
			data: {
				name: req.body.name,
				brandImage: req.body.brandImage,
				brandColor: req.body.brandColor,
				welcomeColor: req.body.welcomeColor,
				welcomebtnText: req.body.welcomebtnText,
				welcomeText: req.body.welcomeText,
				fontstyle: req.body.fontstyle,
				primaryColor: req.body.primaryColor,
				secondaryColor: req.body.secondaryColor,
				auxillaryColor: req.body.auxillaryColor,
				storeStory: req.body.storeStory,
				hasContactPage: req.body.hasContactPage,
				hasAboutPage: req.body.hasAboutPage,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_UPDATED',
			message:
				'Template information updated successfully. Feel free to publish the updated information anytime you want.',
			type: 'success',
			data: temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
