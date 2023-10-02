import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

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

		const groupVariations = (
			variations: {
				id: string;
				type: string;
				value: string;
				product: string;
			}[]
		) => {
			const groupedVariations: { [key: string]: string[] } = {};
			variations.map((variant) => {
				const { type, value } = variant;
				if (!groupedVariations[type]) {
					groupedVariations[type] = [];
				}
				groupedVariations[type].push(value);
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
