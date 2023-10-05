import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { Database } from '../../extensions/dbClient';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const getStore = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const store = await Database.store.findFirst({
			where: {
				id: storeID,
			},
			include: {
				template: true,
				products: {
					include: {
						images: {
							select: {
								url: true,
							},
						},
						reviews: true,
						variations: true,
					},
				},
			},
		});

		if (!store) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'STORE_NOT_FOUND',
				message: 'Could not find store',
				type: 'error',
			});
		}

		const groupVariations = (
			variations: {
				id: string;
				type: string;
				value: string;
				product: string;
			}[]
		) => {
			const groupedVariations: { type: string; values: string[] }[] = [];

			variations.forEach((variant) => {
				const { type, value } = variant;
				const existingGroup = groupedVariations.find(
					(group) => group.type === type
				);

				if (existingGroup) {
					existingGroup.values.push(value);
				} else {
					groupedVariations.push({ type, values: [value] });
				}
			});

			return groupedVariations;
		};
		const newStore = store
			? {
					...store,
					products: store.products.map((product) => {
						return {
							...product,
							variations: groupVariations(product.variations),
						};
					}),
			  }
			: [];

		return res.status(STATUS.OK).json({
			code: 'STORE',
			message: 'Store retrieved successfully',
			type: 'success',
			data: newStore,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
