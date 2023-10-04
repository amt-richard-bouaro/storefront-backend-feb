import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getReviews = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const productID = req.params.product_id;

		const reviews = await Database.review.findMany({
			where: {
				product: productID,
			},
			include: {
				replies: true,
				customerReview: true,
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
