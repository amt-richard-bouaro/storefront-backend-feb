import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';
import { findStoreById } from '../../utils/operations/readOperations';

export const addSiteImage = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

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
				code: 'FILES_NOT_RECEIVED',
				message: 'Server did not receive any files',
				type: 'error',
			});
		}

		const file = req.file as Express.MulterS3.File;

		const image = {
			url: file.location,
			key: file.key,
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
