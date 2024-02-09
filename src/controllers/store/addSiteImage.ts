import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { findStoreById } from '../../services/app/store/findStore';
import { STATUS } from '../../config/statusCode';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STORE_MSG } from '../../constants/api/messages';
import { ADD_SITE_IMAGE } from '../../validations/store';
import { deleteObject, sendFileToS3 } from '../../services/aws/s3Config';

export const addSiteImage = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const requestBody = req.body;

		ADD_SITE_IMAGE.parse(requestBody);

		const { name } = <ADD_SITE_IMAGE>requestBody;

		const store = await findStoreById(storeID, { siteImages: true });

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

		const uploadedFile = await sendFileToS3(file);

		if (!uploadedFile.location || !uploadedFile.key) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.IMAGE_NOT_UPLOADED.CODE,
				message: STORE_MSG.IMAGE_NOT_UPLOADED.MESSAGE,
				type: 'error',
			});
		}

		const image = {
			url: uploadedFile.location,
			key: uploadedFile.key,
			name,
			store: storeID,
		};

		store.siteImages?.forEach(async (image) => {
			if (image.name === name) {
				deleteObject(image.key!);
				await Database.siteImage.delete({
					where: {
						id: image.id,
					},
				});
			}
		});

		const uploadSiteImage = await Database.siteImage.create({
			data: image,
		});

		return res.status(STATUS.OK).json({
			code: STORE_MSG.IMAGE_UPLOADED.CODE,
			message: STORE_MSG.IMAGE_UPLOADED.MESSAGE,
			type: 'success',
			data: { url: uploadSiteImage.url, name: uploadSiteImage.name },
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
