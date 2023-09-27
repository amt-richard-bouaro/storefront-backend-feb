import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { CANCEL_ORDERS } from '../types';

export const cancelOrder = async (req: Request, res: Response<RESPONSE>) => {
	try {
		CANCEL_ORDERS.parse(req.body);

		const requestBody = <CANCEL_ORDERS>req.body;

		const orders = await Database.order.findMany({
			where: {
				id: {
					in: requestBody.orders,
				},
				AND: {
					OR: [
						{
							status: {
								not: {
									in: [
										'Cancelled',
										'Completed',
										'Processing',
										'Delivered',
										'Shipped',
									],
								},
							},
						},
						{
							paid: false,
						},
					],
				},
			},
		});

		if (!orders || orders.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'ORDERS_NOT_CANCELLED',
				message: 'No orders was found. Check your list and try again.',
				type: 'error',
			});
		}

		const eligibleOrders: string[] = orders.map((order) => order.id);

		const cancelledOrders = await Database.order.updateMany({
			where: {
				id: {
					in: eligibleOrders,
				},
			},
			data: {
				status: 'Cancelled',
			},
		});

		return res.status(STATUS.OK).json({
			code: 'ORDERS_CANCELLED',
			message: 'The following orders were canceled successfully',
			type: 'success',
			data: cancelledOrders,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
