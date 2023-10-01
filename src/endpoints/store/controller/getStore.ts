// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

export const getStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const stores = await Database.store.findFirst({
			where: {
				id: storeID,
			},
			include: {
				template: true,
				products: {
					include: {
						images: {
							select: {
								url: true,
							},
						},
						reviews: true,
					},
				},
			},
		});

		return res.status(STATUS.OK).json({
			code: 'STORE',
			message: 'Store retrieved successfully',
			type: 'success',
			data: stores,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
