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
		const tempID = req.params.tempID;

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
				name: temp.name,
				brandImage: temp.brandImage,
				brandColor: temp.brandColor,
				welcomeColor: temp.welcomeColor,
				welcomebtnText: temp.welcomebtnText,
				welcomeText: temp.welcomeText,
				fontstyle: temp.fontstyle,
				primaryColor: temp.primaryColor,
				secondaryColor: temp.secondaryColor,
				auxillaryColor: temp.auxillaryColor,
				storeStory: temp.storeStory,
				hasContactPage: temp.hasContactPage,
				hasAboutPage: temp.hasAboutPage,
			},
		});

		await Database.team.updateMany({
			where: {
				temp: tempID,
			},
			data: {
				template: template.id,
			},
		});

		await Database.reason.updateMany({
			where: {
				temp: tempID,
			},
			data: {
				template: template.id,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_PUBLISHED',
			message:
				"TEMPLATE successfully published. Now customer will see changes you've made to your site.",
			type: 'success',
			data: template,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
