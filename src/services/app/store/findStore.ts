import { Database } from '../../../extensions/dbClient';
import { STORE } from '../../../interfaces/types';

export const findStoreById = async (
	id: string,
	includes?: {
		products?: boolean;
		categories?: boolean;
		orders?: boolean;
		template?: boolean;
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
							},
							orderBy: {
								createdAt: 'desc',
							},
					  }
					: false,
			categories: includes?.categories === true,
			orders: includes?.orders === true,
			template: includes?.template === true,
		},
	});

	return store;
};
