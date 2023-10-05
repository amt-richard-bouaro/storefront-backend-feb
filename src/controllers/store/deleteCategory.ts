import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';

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
