import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';
import { IMAGES_TO_DELETE } from '../types';

export const deleteProductImages = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = <IMAGES_TO_DELETE>req.body;

		IMAGES_TO_DELETE.parse(requestBody);

		await Database.image.deleteMany({
			where: {
				id: {
					in: requestBody.images,
				},
			},
		});

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_DELETED',
			message: 'Images has been successfully deleted',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
