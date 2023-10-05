import { Request, Response } from 'express';
import { NEW_CATEGORY } from '../../validations/business';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';

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
