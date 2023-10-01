// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import { TEMPLATE } from '../types';

export const saveTemplate = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.tempID;

		TEMPLATE.parse(req.body);

		let imageUrl: string;

		if (req.file) {
			const file = req.file as Express.MulterS3.File;
			imageUrl = file.location;
		} else {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'TEAM_MEMBER_NOT_CREATED',
				message: 'Missing picture for this team member',
				type: 'error',
			});
		}

		const template = await Database.template.findFirst({
			where: {
				store: storeID,
			},
			include: {
				temp: true,
			},
		});

		if (!template) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'TEMPLATE_NOT_UPDATED',
				message: 'Store template not updated',
				type: 'error',
			});
		}

		const temp = await Database.temp.update({
			where: {
				id: template.temp?.id,
			},
			data: {
				brandImage: imageUrl,
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
