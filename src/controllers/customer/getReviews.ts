import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getCustomerReviews = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const reviews = await Database.review.findMany({
			where: {
				customer: customerID,
			},
			select: {
				replies: true,
				productReview: {
					select: {
						name: true,
						images: {
							select: {
								url: true,
							},
						},
					},
				},
				orderReview: {
					select: {
						id: true,
						paid: true,
						orderId: true,
						status: true,
						items: {
							select: {
								name: true,
								image: true,
								price: true,
								total: true,
								discount: true,
								variations: true,
								product: true,
							},
						},
					},
				},
				storeReviews: {
					select: {
						storeName: true,
					},
				},
				createdAt: true,
				updatedAt: false,
				rating: true,
				remarks: true,
				comment: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'REVIEWS_FOUND',
			message: 'Reviews for product specify.',
			type: 'error',
			data: reviews,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
