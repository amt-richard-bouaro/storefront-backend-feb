import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAllStores } from '../../services/app/store/findStore';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { STORE } from '../../interfaces/types';
import { STORE_MSG } from '../../constants/api/messages';

export const getAllStores = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const cachedStores = await getCachedResult('all-stores');
		const stores = cachedStores
			? (cachedStores as STORE[])
			: await findAllStores({ template: true });

		const allStores: STORE[] | [] = stores ?? [];

		cachResult('all-stores', allStores);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: allStores,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
