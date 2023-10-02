// import { REQUEST_WITH_USER } from '../../../services/generalTypes';
import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import { TEMPLATE } from '../types';

export const saveTemplate = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		TEMPLATE.parse(req.body);

		const { options } = <TEMPLATE>req.body;

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

		const temp = await Database.temp.update({
			where: {
				id: template.temp?.id,
			},
			data: {
				options: options,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'TEMPLATE_UPDATED',
			message:
				'Template information updated successfully. Feel free to publish the updated information anytime you want.',
			type: 'success',
			data: temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
