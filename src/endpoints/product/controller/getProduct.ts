import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { errorHandler } from '../../../middlewares/errorHandlers';
import { STATUS } from '../../../config/main';
import { Database } from '../../../database/dbClient';

interface rating {
	rating: number;
}
export const getProduct = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const productID = req.params.product_id;

		const product = await Database.product.findFirst({
			where: {
				id: productID,
			},
			include: {
				variations: true,
				reviews: true,
				images: {
					select: {
						url: true,
					},
				},
			},
		});

		if (!product) {
			return res.status(STATUS.OK).json({
				code: 'PRODUCT',
				message: 'Product not found',
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

		const newProduct = {
			...product,
			variations: groupVariations(product.variations),
			rating: getTotalRating(product.reviews),
		};

		return res.status(STATUS.OK).json({
			code: 'ALL_PRODUCTS',
			message: 'Products retrieved',
			type: 'success',
			data: newProduct,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
