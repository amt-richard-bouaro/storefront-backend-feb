import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { TEMPLATE } from '../../validations/business';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreTemplate } from '../../services/app/store/findTemplate';
import { STORE_MSG } from '../../constants/api/messages';
import { saveStoreTemp } from '../../services/app/store/storeTemplate';

export const saveTemplate = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		TEMPLATE.parse(req.body);

		const { options } = <TEMPLATE>req.body;

		const template = await findStoreTemplate(storeID, { temp: true });

		if (!template) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.TEMPLATE_NOT_FOUND.CODE,
				message: STORE_MSG.TEMPLATE_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const temp =
			template.temp && (await saveStoreTemp(template.temp?.id, options));

		return res.status(STATUS.OK).json({
			code: STORE_MSG.TEMPLATE_UPDATED.CODE,
			message: STORE_MSG.TEMPLATE_UPDATED.MESSAGE,
			type: 'success',
			data: temp,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
