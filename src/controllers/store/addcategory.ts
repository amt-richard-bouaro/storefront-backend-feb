import { Request, Response } from 'express';
import { NEW_CATEGORY } from '../../validations/business';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { findStoreById } from '../../services/app/store/findStore';
import { STORE } from '../../interfaces/types';
import { CATEGORY_MSG, STORE_MSG } from '../../constants/api/messages';
import { createStoreCategory } from '../../services/app/store/category';

export const addCategory = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_CATEGORY>req.body;

		NEW_CATEGORY.parse(requestBody);

		const storeID = req.params.storeID;

		const cachedStore = await getCachedResult('with-category' + storeID);

		const store = cachedStore
			? (cachedStore as STORE)
			: await findStoreById(storeID, { categories: true });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const categoriesToSave: { name: string; store: string }[] = [];

		if (store && store.categories) {
			const categoriesExist = store.categories.filter((category) => {
				for (const name of requestBody.names) {
					if (!requestBody.names.includes(category.name)) {
						categoriesToSave.push({ name, store: store.id });
					}
				}
			});

			if (
				categoriesExist &&
				categoriesExist.length === requestBody.names.length
			) {
				return res.status(STATUS.BAD_REQUEST).json({
					code: CATEGORY_MSG.ALREADY_EXISTS.CODE,
					message: CATEGORY_MSG.ALREADY_EXISTS.MESSAGE,
					type: 'error',
					error: { categories: categoriesExist },
				});
			}
		}

		const category = await createStoreCategory(categoriesToSave);

		cachResult('with-category' + storeID, store);

		return res.status(STATUS.OK).json({
			code: CATEGORY_MSG.CREATED.CODE,
			message: CATEGORY_MSG.CREATED.MESSAGE,
			type: 'success',
			data: category,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
