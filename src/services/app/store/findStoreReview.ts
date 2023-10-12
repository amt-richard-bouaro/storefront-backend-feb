import { Database } from '../../../extensions/dbClient';

export const findStoreReviewById = async (id: string) => {
	const reviews = await Database.review.findMany({
		where: {
			store: id,
		},
		select: {
			id: true,
			replies: {
				select: {
					comment: true,
					from: true,
					createdAt: true,
					updatedAt: true,
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
					createdAt: 'desc',
				},
			},
			productReview: {
				select: {
					id: true,
					name: true,
					images: {
						select: {
							url: true,
						},
					},
				},
			},
			orderReview: {
				select: {
					id: true,
					paid: true,
					orderId: true,
					status: true,
					currency: true,
					items: {
						select: {
							name: true,
							image: true,
							price: true,
							total: true,
							discount: true,
							variations: true,
							product: true,
						},
					},
				},
			},
			customerReview: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
			createdAt: true,
			updatedAt: false,
			rating: true,
			remarks: true,
			comment: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return reviews;
};
