import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const publishTemplate = async (
	req: Request,
	res: Response<RESPONSE>
) => {
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

		const publishedTemplate = await Database.template.update({
			where: {
				id: template.id,
			},
			data: {
				options: template.temp?.options,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_PUBLISHED',
			message:
				"TEMPLATE successfully published. Now customer will see changes you've made to your site.",
			type: 'success',
			data: publishedTemplate,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
