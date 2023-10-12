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

export const updateStorePromotion = async (
	promoID: string,
	data: {
		name: string;
		statement: string;
		discount: number;
		start: Date;
		end: Date;
	}
): Promise<PROMOTION | null> => {
	const promotion = await Database.promotion.update({
		where: {
			id: promoID,
		},
		data,
	});

	return promotion;
};

export const findPromotionById = async (
	promoID: string,
	includes?: { products?: boolean }
): Promise<PROMOTION | null> => {
	const promotion = await Database.promotion.findFirst({
		where: {
			id: promoID,
		},
		include: {
			products: includes?.products
				? {
						include: {
							images: {
								select: {
									url: true,
								},
							},
						},
				  }
				: false,
		},
		orderBy: {
			updatedAt: 'desc',
		},
	});

	return promotion;
};

export const findPromotions = async (
	storeID: string,
	includes?: { products?: boolean }
): Promise<PROMOTION[] | null> => {
	const promotion = await Database.promotion.findMany({
		where: {
			store: storeID,
			AND: {
				end: {
					gt: new Date(),
				},
			},
		},
		include: {
			products: includes?.products === true,
		},
		orderBy: {
			createdAt: 'desc',
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

export const removePromoProduct = async (
	promoID: string,
	products: string[]
): Promise<{ count: number }> => {
	const unlinkedProducts = await Database.product.updateMany({
		where: {
			promotion: promoID,
			AND: {
				id: { in: products },
			},
		},
		data: {
			promotion: undefined,
		},
	});

	return unlinkedProducts;
};

export const deletePromo = async (
	promoID: string
): Promise<PROMOTION | null> => {
	const deletedPromo = await Database.promotion.delete({
		where: {
			id: promoID,
		},
	});

	return deletedPromo;
};
