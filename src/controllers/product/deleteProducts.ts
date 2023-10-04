import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { PRODUCTS_TO_DELETE } from '../../validations/product';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const deleteProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <PRODUCTS_TO_DELETE>req.body;

		PRODUCTS_TO_DELETE.parse(requestBody);

		await Database.product.deleteMany({
			where: {
				id: {
					in: requestBody.products,
				},
			},
		});

		return res.status(STATUS.OK).json({
			code: 'PRODUCT_DELETED',
			message: 'Product has been successfully deleted',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
