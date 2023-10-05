import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getTemp = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const template = await Database.template.findFirst({
			where: {
				store: storeID,
			},
			include: {
				temp: true,
			},
		});

		if (!template) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'TEMPLATE_NOT_UPDATED',
				message: 'Store template not updated',
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_FOUND',
			message: 'Unpublished template',
			type: 'success',
			data: template.temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
