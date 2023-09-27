import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { REVIEW_PRODUCT } from '../types';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

export const reviewProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <REVIEW_PRODUCT>req.body;

		REVIEW_PRODUCT.parse(requestBody);

		const productID = req.params.productID;

		// const { id } = <REQUEST_WITH_USER>req.user;

		await Database.review.create({
			data: {
				rating: requestBody.rating,
				comment: requestBody.comment,
				remarks: requestBody.remarks,
				customer: '',
				product: productID,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_ADDED',
			message: 'New product has been successfully added',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
