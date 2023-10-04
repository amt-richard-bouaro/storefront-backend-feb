import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { NEW_PRODUCT } from '../../validations/product';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const updateProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_PRODUCT>req.body;

		NEW_PRODUCT.parse(requestBody);

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_ADDED',
			message: 'New product has been successfully added',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
