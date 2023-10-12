import { Database } from '../../../extensions/dbClient';

export const findProductById = async (
	id: string,
	includes: {
		variations?: boolean;
		reviews?: boolean;
		images?: boolean;
		replies?: boolean;
	}
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
							replies: includes.replies
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
			images: includes.images
				? {
						select: {
							id: true,
							url: true,
						},
				  }
				: false,
			promotionProduct: true,
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
