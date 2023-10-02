import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { findStoreById } from '../../utils/operations/readOperations';
interface rating {
	rating: number;
}
export const getProducts = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const storeID = req.params.store_id;

		const store = await findStoreById(storeID, { products: true });

		if (!store) {
			return res.status(STATUS.OK).json({
				code: 'STORE_NOT_FOUND',
				message: 'Store not found',
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

		const getTotalRating = (reviews: rating[]): number => {
			return reviews.length > 0
				? reviews.reduce((acc, review) => acc + review.rating, 0) /
						reviews.length
				: 0;
		};

		const products = store.products?.map((product) => {
			return {
				...product,
				variations: groupVariations(product.variations ?? []),
				rating: getTotalRating(product.reviews ?? []),
			};
		});

		return res.status(STATUS.OK).json({
			code: 'ALL_PRODUCTS',
			message: 'Products retrieved',
			type: 'success',
			data: products,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
