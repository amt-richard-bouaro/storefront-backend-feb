import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { NEW_CATEGORY } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const addCategory = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_CATEGORY>req.body;

		NEW_CATEGORY.parse(requestBody);

		const storeID = req.params.storeID;

		const category = await Database.category.create({
			data: {
				name: requestBody.name,
				store: storeID,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'CATEGORY_CREATED',
			message: 'New store category has been successfully created',
			type: 'success',
			data: category,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
