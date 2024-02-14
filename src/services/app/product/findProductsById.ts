import { Database } from '../../../extensions/dbClient';
import { PRODUCT } from '../../../interfaces/types';

export const findProductsById = async (
	productIDs: string[]
): Promise<PRODUCT[] | null> => {
	const products = await Database.product.findMany({
		where: {
			id: {
				in: productIDs,
			},
		},
		orderBy: {
			updatedAt: 'desc',
		},
	});

	return products;
};
