import { REVIEW_MSG } from './../../constants/api/messages/review';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { REPLY_REVIEW } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findReviewByUniques } from '../../services/app/review/findSingleReview';
import { addReply } from '../../services/app/review/addReply';
import { CUSTOMER_MSG } from '../../constants/api/messages';
import { findCustomerById } from '../../services/app/customer/findCustomer';

export const customerReply = async (req: Request, res: Response<RESPONSE>) => {
	try {
		REPLY_REVIEW.parse(req.body);

		const requestBody = <REPLY_REVIEW>req.body;

		const customerID = req.params.customer_id;

		const customer = await findCustomerById(customerID, { reviews: true });

		if (!customer) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.CODE,
				message: CUSTOMER_MSG.CUSTOMER_NOT_FOUND.MESSAGE,
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
			from: 'Customer',
			customer: customerID,
			review: requestBody.review,
		});

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.REPLY_SENT.CODE,
			message: CUSTOMER_MSG.REPLY_SENT.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
