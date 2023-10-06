import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findProductReviewsById } from '../../services/app/product/findReviewsForProduct';
import { REVIEW_MSG } from '../../constants/api/messages';

export const getReviews = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const productID = req.params.product_id;

		const reviews = await findProductReviewsById(productID, {
			customerReview: true,
			replies: true,
		});

		if (!reviews || reviews.length === 0) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: REVIEW_MSG.NOT_FOUND.CODE,
				message: REVIEW_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: REVIEW_MSG.REVIEWS_FOUND.CODE,
			message: REVIEW_MSG.REVIEWS_FOUND.MESSAGE,
			type: 'success',
			data: reviews,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
