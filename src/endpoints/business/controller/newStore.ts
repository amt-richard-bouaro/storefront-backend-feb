// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { NEW_STORE } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
// import { findBusinessById } from '../../utils/operations/readOperations';

const defaultTemplate = {
	name: 'Default',
	brandImage: 'unknown',
	brandColor: '#FFFFFF',
	welcomeColor: '#000000',
	welcomebtnText: 'Explore More',
	welcomeText: 'Welcome to Default Store',
	fontstyle: 'Arial',
	primaryColor: '#F0F26A',
	secondaryColor: '#CCC838',
	auxillaryColor: '#334CCC',
	storeStory: 'Our Story is short',
	hasContactPage: false,
	hasAboutPage: false,
};
export const newStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_STORE>req.body;

		NEW_STORE.parse(requestBody);

		const businessID = req.params.businessID;

		// const business = await findBusinessById(businessID);

		const template = requestBody.template || defaultTemplate;

		const store = await Database.store.create({
			data: {
				business: businessID,
				storeName: requestBody.storeName,
				storeType: requestBody.storeType,
				template: {
					create: {
						name: template.name,
						brandImage: template.brandImage,
						brandColor: template.brandColor,
						welcomeColor: template.welcomeColor,
						welcomebtnText: template.welcomebtnText,
						welcomeText: template.welcomeText,
						fontstyle: template.fontstyle,
						primaryColor: template.primaryColor,
						secondaryColor: template.secondaryColor,
						auxillaryColor: template.auxillaryColor,
						storeStory: template.storeStory,
						hasContactPage: template.hasContactPage,
						hasAboutPage: template.hasAboutPage,
						temp: {
							create: {
								name: template.name,
								brandImage: template.brandImage,
								brandColor: template.brandColor,
								welcomeColor: template.welcomeColor,
								welcomebtnText: template.welcomebtnText,
								welcomeText: template.welcomeText,
								fontstyle: template.fontstyle,
								primaryColor: template.primaryColor,
								secondaryColor: template.secondaryColor,
								auxillaryColor: template.auxillaryColor,
								storeStory: template.storeStory,
								hasContactPage: template.hasContactPage,
								hasAboutPage: template.hasAboutPage,
							},
						},
					},
				},
			},
		});

		return res.status(STATUS.OK).json({
			code: 'STORE_CREATED',
			message: 'Business template created successfully',
			type: 'success',
			data: store,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
