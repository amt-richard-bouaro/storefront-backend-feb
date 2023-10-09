import { Database } from '../../../extensions/dbClient';

export const deleteProductsById = async (
	productIDs: string[]
): Promise<{ count: number } | null> => {
	const deleted = await Database.product.updateMany({
		where: {
			id: {
				in: productIDs,
			},
		},

		data: {
			deleted: true,
		},
	});

	return deleted;
};
