import { Database } from '../../../extensions/dbClient';
import { PRODUCT } from '../../../interfaces/types';

export const findProductById = async (
	id: string,
	includes: { variations?: boolean; reviews?: boolean; images?: boolean }
): Promise<PRODUCT | null> => {
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
		},
	});

	return product;
};
