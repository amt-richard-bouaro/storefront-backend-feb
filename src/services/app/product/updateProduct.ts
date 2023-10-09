import { Database } from '../../../extensions/dbClient';
import { PRODUCT } from '../../../interfaces/types';

export const updateProductById = async (
	productID: string,
	data: {
		name: string;
		price: number;
		quantity: number;
		description: string;
		isActive: boolean;
		category: string;
		discount: number;
	}
): Promise<PRODUCT | null> => {
	const product = await Database.product.update({
		where: {
			id: productID,
		},

		data,
	});

	return product;
};
