import { PRODUCT_MSG } from './../../constants/api/messages/product';
import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { IMAGES_TO_DELETE } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { deleteProductImage } from '../../services/app/product/deleteProductImage';

export const deleteProductImages = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <IMAGES_TO_DELETE>req.body;

		IMAGES_TO_DELETE.parse(requestBody);

		const deleteCount = await deleteProductImage(requestBody.images);

		if (!deleteCount || deleteCount.count < 1) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: PRODUCT_MSG.IMAGES_NOT_DELETED.CODE,
				message: PRODUCT_MSG.IMAGES_NOT_DELETED.MESSAGE,
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: PRODUCT_MSG.IMAGES_DELETED.CODE,
			message: PRODUCT_MSG.IMAGES_DELETED.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
