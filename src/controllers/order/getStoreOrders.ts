import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { Database } from '../../extensions/dbClient';

export const getStoreOrders = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const order = await Database.order.findMany({
			where: {
				store: storeID,
			},
			include: {
				items: true,
			},
		});

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDER_NOT_FOUND',
				message: 'Could not find order information',
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: 'ORDER_FOUND',
			message: 'Store Orders successfully retreived',
			type: 'success',
			data: order,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
