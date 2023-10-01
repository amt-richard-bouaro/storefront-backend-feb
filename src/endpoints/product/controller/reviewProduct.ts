import { Request, Response } from 'express';
import { RESPONSE, REQUEST_WITH_USER } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { REVIEW_PRODUCT } from '../types';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

export const reviewProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		REVIEW_PRODUCT.parse(req.body);

		const requestBody = <REVIEW_PRODUCT>req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const orderID = req.params.order_id;

		const order = await Database.order.findUnique({
			where: {
				id: orderID,
			},
			include: {
				customerOrder: true,
				items: true,
			},
		});

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REVIEW_DENIED',
				message: 'Could not find order for order item review',
				type: 'error',
			});
		}

		const orderItem = order.items.find(
			(item) => item.product === requestBody.product
		);

		if (order.customerOrder.account !== id || !orderItem) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REVIEW_DENIED',
				message: 'You cannot review this product at this time.',
				type: 'error',
			});
		}

		await Database.review.create({
			data: {
				rating: requestBody.rating,
				comment: requestBody.comment,
				remarks: requestBody.remarks,
				customer: order.customer,
				product: orderItem.product,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'REVIEW_SENT',
			message: 'Your review has been sent to the seller.',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
