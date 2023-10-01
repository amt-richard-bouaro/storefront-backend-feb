import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { REPLY_REVIEW } from '../types';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

export const replyReview = async (req: Request, res: Response<RESPONSE>) => {
	try {
		REPLY_REVIEW.parse(req.body);

		const requestBody = <REPLY_REVIEW>req.body;

		const { customer } = <REQUEST_WITH_USER>req.user;

		const review = await Database.review.findFirst({
			where: {
				OR: [{ id: requestBody.review }, { customer }],
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
				from: typeof customer === 'string' ? 'Customer' : 'Business',
				customer: requestBody.from,
				review: requestBody.review,
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
