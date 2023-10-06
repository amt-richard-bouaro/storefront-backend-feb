import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreTemplate } from '../../services/app/store/findTemplate';
import { STORE_MSG } from '../../constants/api/messages';
import { getCachedResult } from '../../extensions/redis';
import { TEMPLATE } from '../../interfaces/types';

export const getTemp = async (req: Request, res: Response<RESPONSE>) => {
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

		return res.status(STATUS.OK).json({
			code: STORE_MSG.TEMPLATE_FOUND.CODE,
			message: STORE_MSG.TEMPLATE_FOUND.MESSAGE,
			type: 'success',
			data: template.temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
