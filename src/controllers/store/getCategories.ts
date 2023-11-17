import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { Database } from '../../extensions/dbClient';

export const getStoreCategories = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const storeCategories = await Database.category.findMany({
			where: {
				store: storeID,
			},
			select: {
				id: true,
				name: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'STORE_CATEGORIES_FETCH',
			message: 'Store categories found',
			type: 'success',
			data: storeCategories,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
