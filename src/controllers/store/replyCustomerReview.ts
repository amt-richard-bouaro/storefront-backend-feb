import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { REPLY_REVIEW } from '../../validations/product';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const replyCustomerReview = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		REPLY_REVIEW.parse(req.body);

		const requestBody = <REPLY_REVIEW>req.body;

		const reviewID = req.params.review_id;

		const review = await Database.review.findFirst({
			where: {
				OR: [{ id: reviewID }],
			},
		});

		if (!review) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REVIEW_NOT_FIND',
				message: 'Could not find review',
				type: 'error',
			});
		}

		await Database.reply.create({
			data: {
				comment: requestBody.comment,
				from: 'Business',
				store: requestBody.from,
				review: requestBody.review,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'REPLY_SENT',
			message: 'Your reply has been sent to the customer.',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
