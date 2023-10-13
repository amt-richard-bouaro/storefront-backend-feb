import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { REPLY_REVIEW } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findReviewByUniques } from '../../services/app/review/findSingleReview';
import { REVIEW_MSG, STORE_MSG } from '../../constants/api/messages';
import { addReply } from '../../services/app/review/addReply';
import { findStoreById } from '../../services/app/store/findStore';

export const replyCustomerReview = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		REPLY_REVIEW.parse(req.body);

		const requestBody = <REPLY_REVIEW>req.body;

		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, {});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const review = await findReviewByUniques(requestBody.review);

		if (!review) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: REVIEW_MSG.NOT_FOUND.CODE,
				message: REVIEW_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		await addReply({
			comment: requestBody.comment,
			from: 'Business',
			store: storeID,
			review: review.id,
		});

		return res.status(STATUS.OK).json({
			code: STORE_MSG.REPLY_SENT.CODE,
			message: STORE_MSG.REPLY_SENT.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
