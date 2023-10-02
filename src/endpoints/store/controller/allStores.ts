// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

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
