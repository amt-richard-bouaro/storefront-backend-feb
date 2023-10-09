import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';

export const addSiteImage = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const imageName = req.body.name;

		const store = await findStoreById(storeID);

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_DELETED.CODE,
				message: STORE_MSG.NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		if (!req.file) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.IMAGES_NOT_RECEIVED.CODE,
				message: STORE_MSG.IMAGES_NOT_RECEIVED.MESSAGE,
				type: 'error',
			});
		}

		const file = req.file as Express.MulterS3.File;

		const image = {
			url: file.location,
			key: file.key,
			name: imageName,
			store: storeID,
		};

		const uploadSiteImage = await Database.siteImage.create({
			data: image,
		});

		return res.status(STATUS.OK).json({
			code: STORE_MSG.IMAGE_UPLOADED.CODE,
			message: STORE_MSG.IMAGE_UPLOADED.MESSAGE,
			type: 'success',
			data: { url: uploadSiteImage.url },
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
