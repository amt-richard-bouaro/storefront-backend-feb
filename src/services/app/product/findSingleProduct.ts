import { Database } from '../../../extensions/dbClient';

export const findProductById = async (
	id: string,
	includes: { variations?: boolean; reviews?: boolean; images?: boolean }
) => {
	const product = await Database.product.findFirst({
		where: {
			id,
			AND: {
				deleted: false,
			},
		},
		include: {
			variations: includes.variations === true,
			reviews: includes.reviews === true,
			images: includes.images
				? {
						select: {
							id: true,
							url: true,
						},
				  }
				: false,
			promotionProduct: {
				select: {
					discount: true,
					start: true,
					end: true,
					name: true,
				},
			},
		},
	});

	return product;
};

export const findExistingProducts = async (
	productIDs: string[]
): Promise<string[] | null> => {
	const existingProducts: string[] = [];

	for (const productID of productIDs) {
		const exist = await findProductById(productID, {});
		exist && existingProducts.push(exist.id);
	}

	return existingProducts;
};
