import { Database } from '../../../extensions/dbClient';
import { SITE_IMAGE, STORE } from '../../../interfaces/types';

export const findStoreById = async (
	id: string,
	includes?: {
		products?: boolean;
		categories?: boolean;
		orders?: boolean;
		template?: boolean;
		reviews?: boolean;
		wallets?: boolean;
	}
): Promise<STORE | null> => {
	const store = await Database.store.findFirst({
		where: {
			id,
		},
		include: {
			products:
				includes?.products === true
					? {
							where: {
								deleted: false,
							},
							include: {
								variations: true,
								images: {
									select: {
										url: true,
										key: false,
										id: true,
										product: false,
									},
								},
								reviews: includes.reviews === true,
								promotionProduct: {
									select: {
										discount: true,
										start: true,
										end: true,
										name: true,
									},
								},
							},
							orderBy: {
								createdAt: 'desc',
							},
					  }
					: false,
			categories: includes?.categories === true,
			orders: includes?.orders === true,
			template: includes?.template === true,
			wallets: includes?.wallets === true,
		},
	});

	return store;
};
export const findStoreSiteImages = async (
	storeID: string,
	includes?: { key?: boolean; store?: boolean }
): Promise<SITE_IMAGE[] | null> => {
	const siteImages = await Database.siteImage.findMany({
		where: {
			store: storeID,
		},
		select: {
			id: true,
			url: true,
			name: true,
			store: includes?.store === true,
			key: includes?.key === true,
		},
	});

	return siteImages;
};

export const deleteStoreSiteImages = async (
	siteImages: string[]
): Promise<{ count: number } | null> => {
	const deleted = await Database.siteImage.deleteMany({
		where: {
			id: { in: siteImages },
		},
	});

	return deleted;
};
