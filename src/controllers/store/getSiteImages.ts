import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findStoreSiteImages } from '../../services/app/store/findStore';
import { STORE_MSG } from '../../constants/api/messages';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { SITE_IMAGE } from '../../interfaces/types';

export const getSiteImages = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const cachedSiteImages = await getCachedResult('site-images' + storeID);

		const siteImages = cachedSiteImages
			? (cachedSiteImages as SITE_IMAGE[])
			: await findStoreSiteImages(storeID, {});

		if (!siteImages) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const allSiteImages = siteImages ? siteImages : [];

		cachResult('site-images' + storeID, allSiteImages);

		return res.status(STATUS.OK).json({
			code: STORE_MSG.STORE_INFORMATION_RETRIEVED.CODE,
			message: STORE_MSG.STORE_INFORMATION_RETRIEVED.MESSAGE,
			type: 'success',
			data: allSiteImages,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
