import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getStores = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const stores = await Database.store.findMany({
			include: {
				template: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ALL_STORE',
			message: 'Store retrieved successfully',
			type: 'success',
			data: stores,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
