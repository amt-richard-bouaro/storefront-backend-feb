import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { deleteStoreCategory } from '../../services/app/store/category';
import { DELETE_CATEGORIES } from '../../validations/business';
import { CATEGORY_MSG } from '../../constants/api/messages';

export const deleteCategory = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <DELETE_CATEGORIES>req.body;

		DELETE_CATEGORIES.parse(requestBody);

		const deletedCategory = await deleteStoreCategory(requestBody.categories);

		return res.status(STATUS.OK).json({
			code: CATEGORY_MSG.DELETED.CODE,
			message: `${deletedCategory?.count}  ${CATEGORY_MSG.DELETED.MESSAGE}`,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
