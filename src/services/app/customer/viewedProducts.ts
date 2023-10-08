import { Database } from '../../../extensions/dbClient';
import { SAVED_ITEM } from '../../../interfaces/types';

export const addProductsToFavorite = async (
	data: {
		customer: string;
		product: string;
		store: string;
		liked?: boolean;
	}[]
): Promise<{ count: number } | null> => {
	const savedProducts = await Database.savedItem.createMany({
		data,
	});

	return savedProducts;
};

export const findCustomerSavedProduct = async (data: {
	customer: string;
	product: string;
}): Promise<SAVED_ITEM | null> => {
	const savedProduct = await Database.savedItem.findFirst({
		where: {
			AND: [{ customer: data.customer }, { product: data.product }],
		},
	});

	return savedProduct;
};

export const findCustomerSavedProducts = async (customerId: string) => {
	const savedProduct = await Database.savedItem.findMany({
		where: {
			customer: customerId,
		},
		select: {
			liked: true,
			createdAt: true,
			updatedAt: true,
			savedProduct: {
				select: {
					name: true,
					images: {
						select: {
							url: true,
						},
					},
					price: true,
					discount: true,
					variations: {
						select: {
							type: true,
							value: true,
						},
					},
					category: true,
					quantity: true,
					storeProducts: {
						select: {
							storeName: true,
						},
					},
				},
			},
		},
	});

	return savedProduct;
};

export const setProductAsLiked = async (data: {
	customer: string;
	product: string;
	liked: boolean;
}): Promise<{ count: number } | null> => {
	const updated = await Database.savedItem.updateMany({
		where: {
			AND: [{ customer: data.customer }, { product: data.product }],
		},
		data: {
			liked: data.liked === true,
		},
	});

	return updated;
};

export const saveLikedProduct = async (
	data: {
		customer: string;
		product: string;
		store: string;
		liked: boolean;
	}[]
): Promise<{ count: number } | null> => {
	const updated = await Database.savedItem.createMany({
		data,
	});

	return updated;
};
