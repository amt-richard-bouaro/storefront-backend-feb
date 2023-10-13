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

export const updateProductsDiscount = async (
	productIDs: string[],
	discount: number
): Promise<{ count: number }> => {
	const product = await Database.product.updateMany({
		where: {
			id: {
				in: productIDs,
			},
		},
		data: {
			discount,
		},
	});

	return product;
};
