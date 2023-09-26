import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { REASON } from '../types';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const addReasonWhy = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <REASON>req.body;

		REASON.parse(requestBody);

		const tempID = req.params.tempID;

		const reason = await Database.reason.create({
			data: {
				title: requestBody.title,
				paragraph: requestBody.paragraph,
				temp: tempID,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'REASON_ADDED',
			message: 'Reason has been added successfully',
			type: 'success',
			data: reason,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
