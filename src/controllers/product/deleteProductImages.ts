import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { IMAGES_TO_DELETE } from '../../validations/product';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

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
