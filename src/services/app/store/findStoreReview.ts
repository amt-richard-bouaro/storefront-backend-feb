import { Database } from '../../../extensions/dbClient';

export const findStoreReviewById = async (id: string) => {
	const reviews = await Database.review.findMany({
		where: {
			store: id,
		},
		select: {
			replies: true,
			productReview: {
				select: {
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
	});

	return reviews;
};
