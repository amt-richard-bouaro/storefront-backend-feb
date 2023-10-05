import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const addSiteImage = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const imageName = req.body.name;

		const store = await findStoreById(storeID);

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'STORE_NOT_FOUND',
				message: 'No store with ID ' + storeID,
				type: 'error',
			});
		}

		if (!req.file) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'FILE_NOT_RECEIVED',
				message: 'Server did not receive any files',
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
			code: 'IMAGES UPLOADED',
			message: 'Store image uploaded successfully',
			type: 'success',
			data: { url: uploadSiteImage.url },
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
