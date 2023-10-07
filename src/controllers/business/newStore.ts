import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { NEW_STORE } from '../../validations/business';
import { findBusinessById } from '../../services/app/business/findBusiness';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { BUSINESS_MSG } from '../../constants/api/messages/business';
import { STORE_MSG } from '../../constants/api/messages';
import { findStoreByName } from '../../services/app/store/findStoreByName';

const defaultTemplate = {
	options: JSON.stringify({ name: 'default', description: 'not set' }),
};
export const newStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_STORE>req.body;

		NEW_STORE.parse(requestBody);

		const businessID = req.params.business_id;

		const business = await findBusinessById(businessID);

		if (!business) {
			return res.status(STATUS.OK).json({
				code: BUSINESS_MSG.BUSINESS_NOT_FOUND.CODE,
				message: BUSINESS_MSG.BUSINESS_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const storeExist = await findStoreByName(requestBody.storeName.trim());

		if (!storeExist) {
			return res.status(STATUS.OK).json({
				code: STORE_MSG.NAME_ALREADY_EXISTS.CODE,
				message: STORE_MSG.NAME_ALREADY_EXISTS.MESSAGE,
				type: 'error',
			});
		}

		const template = requestBody.template ?? defaultTemplate;

		const store = await Database.store.create({
			data: {
				business: businessID,
				storeName: requestBody.storeName.trim(),
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
			code: STORE_MSG.CREATED_SUCCESSFULLY.CODE,
			message: STORE_MSG.CREATED_SUCCESSFULLY.MESSAGE,
			type: 'success',
			data: store,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
