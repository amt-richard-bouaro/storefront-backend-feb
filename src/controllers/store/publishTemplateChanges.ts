import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreTemplate } from '../../services/app/store/findTemplate';
import { STORE_MSG } from '../../constants/api/messages';
import { publishStoreTemplate } from '../../services/app/store/storeTemplate';

export const publishTemplate = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;

		const template = await findStoreTemplate(storeID, { temp: true });

		if (!template) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.TEMPLATE_NOT_FOUND.CODE,
				message: STORE_MSG.TEMPLATE_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		template.temp &&
			(await publishStoreTemplate(template.id, template.temp?.options));

		return res.status(STATUS.OK).json({
			code: STORE_MSG.TEMPLATE_PUBLISHED.CODE,
			message: STORE_MSG.TEMPLATE_PUBLISHED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
