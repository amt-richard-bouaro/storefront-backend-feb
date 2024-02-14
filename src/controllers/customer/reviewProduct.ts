import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { REVIEW_PRODUCT } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findOrderById } from '../../services/app/order/findOrder';
import { createReview } from '../../services/app/review/createReview';
import { ORDER_MSG, REVIEW_MSG } from '../../constants/api/messages';

export const reviewProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		REVIEW_PRODUCT.parse(req.body);

		const requestBody = <REVIEW_PRODUCT>req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const orderID = req.params.order_id;

		const order = await findOrderById(orderID, {
			items: true,
			customerOrder: true,
			reviews: true,
		});

		if (!order) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ORDER_MSG.NOT_FOUND.CODE,
				message: ORDER_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const orderItem =
			order.items &&
			order.items.find((item) => item.product === requestBody.product);

		if (
			(order.customerOrder && order.customerOrder.account !== id) ||
			!orderItem
		) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: REVIEW_MSG.DENIED.CODE,
				message: REVIEW_MSG.DENIED.MESSAGE,
				type: 'error',
			});
		}

		const alreadyReviewed =
			order.reviews &&
			order.reviews.find((review) => review.customer === order.customer);

		if (alreadyReviewed) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: REVIEW_MSG.ALREADY_EXISTS.CODE,
				message: REVIEW_MSG.ALREADY_EXISTS.MESSAGE,
				type: 'error',
			});
		}

		await createReview({
			rating: requestBody.rating,
			comment: requestBody.comment,
			remarks: requestBody.remarks,
			customer: order.customer,
			product: orderItem.product,
			store: order.store,
			order: order.id,
		});

		return res.status(STATUS.OK).json({
			code: REVIEW_MSG.REVIEW_SENT.CODE,
			message: REVIEW_MSG.REVIEW_SENT.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
