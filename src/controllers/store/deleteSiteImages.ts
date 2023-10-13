import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { STORE_MSG } from '../../constants/api/messages';
import { DELETE_SITE_IMAGES } from '../../validations/store';
import {
	deleteStoreSiteImages,
	findStoreSiteImages,
} from '../../services/app/store/findStore';
import { deleteObject } from '../../services/aws/s3Config';

export const deleteSiteImages = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		const storeID = req.params.store_id;

		DELETE_SITE_IMAGES.parse(requestBody);

		const { images } = <DELETE_SITE_IMAGES>requestBody;

		const siteImages = await findStoreSiteImages(storeID, { key: true });

		if (!siteImages || siteImages.length === 0) {
			return res.status(STATUS.OK).json({
				code: STORE_MSG.IMAGES_NOT_DELETED.CODE,
				message: STORE_MSG.IMAGES_NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		const imagesToDelete = siteImages.filter((image) =>
			images.includes(image.id)
		);

		if (imagesToDelete.length < 1) {
			return res.status(STATUS.OK).json({
				code: STORE_MSG.IMAGES_NOT_DELETED.CODE,
				message: STORE_MSG.IMAGES_NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		imagesToDelete.forEach(async (image) => {
			deleteObject(image.key!);
			await deleteStoreSiteImages([image.id]);
		});

		return res.status(STATUS.OK).json({
			code: STORE_MSG.IMAGES_DELETED.CODE,
			message: STORE_MSG.IMAGES_DELETED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
