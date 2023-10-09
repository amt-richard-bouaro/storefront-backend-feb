import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAllOrders } from '../../services/app/order/findAllOrders';
import { ORDER_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { Order } from '@prisma/client';

export const getStoreOrders = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const cachedStoreOrders = await getCachedResult('store-orders' + storeID);

		const orders = cachedStoreOrders
			? (cachedStoreOrders as Order[])
			: await findAllOrders(storeID, { items: true });

		if (!orders) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_RETURNED.CODE,
				message: ORDER_MSG.NOT_RETURNED.MESSAGE,
				type: 'error',
			});
		}

		cachResult('store-orders' + storeID, orders);

		return res.status(STATUS.OK).json({
			code: ORDER_MSG.ORDERS_FOUND.CODE,
			message: ORDER_MSG.ORDERS_FOUND.MESSAGE,
			type: 'success',
			data: orders,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
