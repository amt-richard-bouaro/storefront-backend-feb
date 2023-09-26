import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { Database } from '../../../database/dbClient';
import { STATUS } from '../../../config/main';

export const deleteCategory = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const categoryID = req.params.categoryID;

		const category = await Database.category.delete({
			where: {
				id: categoryID,
			},
		});

		return res.status(STATUS.OK).json({
			code: 'CATEGORY_DELETED',
			message: 'Categories deleted successfully',
			type: 'success',
			data: category,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
