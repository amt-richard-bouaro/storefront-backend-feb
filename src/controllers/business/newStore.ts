import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { NEW_STORE } from '../../validations/business';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

const defaultTemplate = {
	options: JSON.stringify({ name: 'default', description: 'not set' }),
};
export const newStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_STORE>req.body;

		NEW_STORE.parse(requestBody);

		const businessID = req.params.businessID;

		const business = await findBusinessById(businessID);

		if (!business) {
			return res.status(STATUS.OK).json({
				code: 'BUSINESS_NOT_FOUND',
				message: 'Could not find business',
				type: 'error',
			});
		}

		const template = requestBody.template ?? defaultTemplate;

		const store = await Database.store.create({
			data: {
				business: businessID,
				storeName: requestBody.storeName,
				storeType: requestBody.storeType,
				template: {
					create: {
						options: template.options,
						temp: {
							create: {
								options: template.options,
							},
						},
					},
				},
			},
			include: {
				template: {
					select: {
						options: true,
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
