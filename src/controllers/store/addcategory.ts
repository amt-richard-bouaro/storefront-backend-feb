import { Request, Response } from 'express';
import { NEW_CATEGORY } from '../../validations/business';
import { RESPONSE } from '../../interfaces';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { STATUS } from '../../config/statusCode';
import { findStoreById } from '../../services/app/store/findStore';
import { CATEGORY_MSG, STORE_MSG } from '../../constants/api/messages';
import { createStoreCategory } from '../../services/app/store/category';
import { Database } from '../../extensions/dbClient';

export const addCategory = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const requestBody = <NEW_CATEGORY>req.body;

		const { names } = NEW_CATEGORY.parse(requestBody);

		const storeID = req.params.store_id;

		// const cachedStore = await getCachedResult('with-category' + storeID);

		const store = await findStoreById(storeID, { categories: true });

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: STORE_MSG.NOT_FOUND.CODE,
				message: STORE_MSG.NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const categorySet = new Set(names);

		store.categories &&
			store.categories.map((category) => {
				categorySet.has(category.name) && categorySet.delete(category.name);
			});

		const categoriesToSave: { name: string; store: string }[] = Array.from(
			categorySet
		).map((el) => ({ name: el, store: store.id }));

		const createCount = await createStoreCategory(categoriesToSave);

		const storeCategories = await Database.category.findMany({
			where: {
				store: storeID,
			},
			select: {
				id: true,
				name: true,
			},
		});

		return res.status(STATUS.OK).json({
			code: CATEGORY_MSG.CREATED.CODE,
			message: CATEGORY_MSG.CREATED.MESSAGE,
			type: 'success',
			data: { count: createCount?.count, categories: storeCategories },
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
