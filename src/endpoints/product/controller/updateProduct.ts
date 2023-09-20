import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { NEW_PRODUCT } from '../types';
// import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const updateProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_PRODUCT>req.body;

		NEW_PRODUCT.parse(requestBody);

		// const productID = req.params.productID;

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
