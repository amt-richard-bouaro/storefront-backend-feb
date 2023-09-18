// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { TEMPLATE } from '../../business/types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { findBusinessById } from '../../utils/operations/readOperations';

export const newStoreTemplate = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <TEMPLATE>req.body;

		TEMPLATE.parse(requestBody);

		const businessID = req.params.id;

		const templateAvailable = await Database.template.findFirst({
			where: {
				business: businessID,
			},
		});

		if (templateAvailable) {
			return res.status(STATUS.OK).json({
				code: 'TEMPLATE_CREATION_FAILED',
				message: 'Business already has a template',
				type: 'error',
			});
		}

		await Database.template.create({
			data: {
				name: requestBody.name,
				brandImage: requestBody.brandImage,
				brandColor: requestBody.brandColor,
				welcomeColor: requestBody.welcomeColor,
				welcomebtnText: requestBody.welcomebtnText,
				welcomeText: requestBody.welcomeText,
				fontstyle: requestBody.fontstyle,
				primaryColor: requestBody.primaryColor,
				secondaryColor: requestBody.secondaryColor,
				auxillaryColor: requestBody.auxillaryColor,
				storeStory: requestBody.storeStory,
				hasContactPage: requestBody.hasContactPage,
				hasAboutPage: requestBody.hasAboutPage,
				business: businessID,
				temp: {
					create: {
						name: requestBody.name,
						brandImage: requestBody.brandImage,
						brandColor: requestBody.brandColor,
						welcomeColor: requestBody.welcomeColor,
						welcomebtnText: requestBody.welcomebtnText,
						welcomeText: requestBody.welcomeText,
						fontstyle: requestBody.fontstyle,
						primaryColor: requestBody.primaryColor,
						secondaryColor: requestBody.secondaryColor,
						auxillaryColor: requestBody.auxillaryColor,
						storeStory: requestBody.storeStory,
						hasContactPage: requestBody.hasContactPage,
						hasAboutPage: requestBody.hasAboutPage,
					},
				},
			},
		});

		const business = await findBusinessById(businessID);

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_CREATED',
			message: 'Business template created successfully',
			type: 'success',
			data: business,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
