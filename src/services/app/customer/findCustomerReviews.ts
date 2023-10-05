import { Database } from '../../../extensions/dbClient';

export const findCustomerReviews = async (customerId: string) => {
	const reviews = await Database.review.findMany({
		where: {
			customer: customerId,
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
			storeReviews: {
				select: {
					storeName: true,
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
