import { Database } from '../../../extensions/dbClient';
import { PROMOTION } from '../../../interfaces/types/store';

export const saveStorePromotion = async (data: {
	name: string;
	statement: string;
	discount: number;
	start: Date;
	end: Date;
	store: string;
}): Promise<PROMOTION | null> => {
	const promotion = await Database.promotion.create({
		data,
	});

	return promotion;
};

export const findPromotionById = async (
	promoID: string
): Promise<PROMOTION | null> => {
	const promotion = await Database.promotion.findFirst({
		where: {
			id: promoID,
		},
	});

	return promotion;
};

export const setPromoProduct = async (
	promoID: string,
	data: {
		products: string[];
		categories: string[];
	}
): Promise<{ count: number }> => {
	const products = await Database.product.updateMany({
		where: {
			OR: [
				{ id: { in: data.products } },
				{ category: { in: data.categories } },
			],
		},
		data: {
			promotion: promoID,
		},
	});

	return products;
};
