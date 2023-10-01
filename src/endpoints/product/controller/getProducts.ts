import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { findStoreById } from '../../utils/operations/readOperations';

export const getProducts = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const products = await findStoreById(storeID, { products: true });

		return res.status(STATUS.OK).json({
			code: 'ALL_PRODUCTS',
			message: 'Products retrieved',
			type: 'success',
			data: products?.products ?? [],
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
