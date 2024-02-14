import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAllOrders } from '../../services/app/order/findAllOrders';
import { ORDER_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { ORDER } from '../../interfaces/types';

export const getCustomerOrders = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const cachedCustomerOrders = await getCachedResult(
			'customer-orders' + customerID
		);

		const orders = cachedCustomerOrders
			? (cachedCustomerOrders as ORDER[])
			: await findAllOrders(customerID, {
					items: true,
					shipping: true,
					store: true,
			  });

		if (!orders) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		cachResult('customer-orders' + customerID, orders, 15);

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
