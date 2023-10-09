import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { getCachedResult } from '../../extensions/redis';
import { findStoreTemplate } from '../../services/app/store/findTemplate';
import { TEMPLATE } from '../../interfaces/types';
import { STORE_MSG } from '../../constants/api/messages';
import { publishStoreTemplate } from '../../services/app/store/storeTemplate';

export const publishTemplate = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const storeID = req.params.store_id;
		const cachesStoreTemplate = await getCachedResult(
			'store-template' + storeID
		);

		const template = cachesStoreTemplate
			? (cachesStoreTemplate as TEMPLATE)
			: await findStoreTemplate(storeID, { temp: true });

		if (!template) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.TEMPLATE_NOT_FOUND.CODE,
				message: STORE_MSG.TEMPLATE_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const publishedTemplate =
			template.temp &&
			(await publishStoreTemplate(template.id, template.temp?.options));

		return res.status(STATUS.OK).json({
			code: STORE_MSG.TEMPLATE_PUBLISHED.CODE,
			message: STORE_MSG.TEMPLATE_PUBLISHED.MESSAGE,
			type: 'success',
			data: publishedTemplate,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
