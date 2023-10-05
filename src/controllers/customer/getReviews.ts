import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findCustomerReviews } from '../../services/app/customer/findCustomerReviews';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { CUSTOMER_MSG } from '../../constants/api/messages';

export const getCustomerReviews = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const customerID = req.params.customer_id;

		const cachedCustomerReviews = await getCachedResult(
			'customer-reviews' + customerID
		);

		const reviews = cachedCustomerReviews
			? cachedCustomerReviews
			: await findCustomerReviews(customerID);

		reviews && cachResult('customer-reviews' + customerID, reviews);

		return res.status(STATUS.OK).json({
			code: CUSTOMER_MSG.REVIEWS_FOUND.CODE,
			message: CUSTOMER_MSG.REVIEWS_FOUND.MESSAGE,
			type: 'success',
			data: reviews ?? [],
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
