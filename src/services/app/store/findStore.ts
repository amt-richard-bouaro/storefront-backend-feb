import { Prisma } from '@prisma/client';
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
		reply?: boolean;
		wallets?: boolean;
		siteImages?: boolean;
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
								reviews: includes.reviews
									? {
											select: {
												rating: true,
												remarks: true,
												comment: true,
												createdAt: true,
												customerReview: {
													select: {
														firstName: true,
														lastName: true,
													},
												},
												replies: includes.reply
													? {
															select: {
																comment: true,
																from: true,
																createdAt: true,
																customerReply: {
																	select: {
																		firstName: true,
																		lastName: true,
																	},
																},
																storeReply: {
																	select: {
																		storeName: true,
																	},
																},
															},
															orderBy: {
																updatedAt: 'desc',
															},
													  }
													: false,
											},
											orderBy: {
												updatedAt: 'desc',
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
							orderBy: {
								createdAt: 'desc',
							},
					  }
					: false,
			categories: includes?.categories === true,
			orders: includes?.orders === true,
			template: includes?.template === true,
			wallets: includes?.wallets === true,
			siteImages: includes?.siteImages === true,
		},
	});

	return store;
};
export const findAllStores = async (includes?: {
	products?: boolean;
	categories?: boolean;
	orders?: boolean;
	template?: boolean;
	reviews?: boolean;
	replies?: boolean;
	wallets?: boolean;
	siteImages?: boolean;
}): Promise<STORE[] | null> => {
	const store = await Database.store.findMany({
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
								reviews: includes.reviews
									? {
											include: {
												replies: includes.replies
													? {
															select: {
																comment: true,
																storeReply: {
																	select: {
																		storeName: true,
																	},
																},
																customerReply: {
																	select: {
																		firstName: true,
																		lastName: true,
																	},
																},
																createdAt: true,
																updatedAt: true,
															},
															orderBy: {
																createdAt: 'desc',
															},
													  }
													: false,
											},
											orderBy: { createdAt: 'desc' },
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
							orderBy: {
								createdAt: 'desc',
							},
					  }
					: false,
			categories: includes?.categories === true,
			orders: includes?.orders === true,
			template: includes?.template === true,
			wallets: includes?.wallets === true,
			siteImages: includes?.siteImages === true,
		},
		orderBy: {
			createdAt: 'desc',
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

export const findStoreProducts = async (
	store_id: string,
	includes: { reviews?: boolean; reply?: boolean; category?: string }
) => {
	const whereClause: Prisma.ProductWhereInput = includes.category
		? {
				store: store_id,
				deleted: false,
				isActive: true,
				AND: [
					{
						category: {
							contains: includes.category,
							mode: 'insensitive',
						},
					},
				],
		  }
		: {
				store: store_id,
				deleted: false,
				isActive: true,
		  };
	const store = await Database.product.findMany({
		where: whereClause,
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
			reviews: includes.reviews
				? {
						select: {
							rating: true,
							remarks: true,
							comment: true,
							createdAt: true,
							customerReview: {
								select: {
									firstName: true,
									lastName: true,
								},
							},
							replies: includes.reply
								? {
										select: {
											comment: true,
											from: true,
											createdAt: true,
											customerReply: {
												select: {
													firstName: true,
													lastName: true,
												},
											},
											storeReply: {
												select: {
													storeName: true,
												},
											},
										},
										orderBy: {
											updatedAt: 'desc',
										},
								  }
								: false,
						},
						orderBy: {
							updatedAt: 'desc',
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
		orderBy: {
			createdAt: 'desc',
		},
	});

	return store;
};
