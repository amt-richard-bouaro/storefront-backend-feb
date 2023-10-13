import { Database } from '../../../extensions/dbClient';
import { REVIEW } from '../../../interfaces/types';

export const findProductReviewsById = async (
	productID: string,
	includes: { replies?: boolean; customerReview?: boolean }
): Promise<REVIEW[] | null> => {
	const review = await Database.review.findMany({
		where: {
			product: productID,
		},
		include: {
			replies: includes.replies === true,
			customerReview: includes.replies
				? {
						select: {
							firstName: true,
							lastName: true,
							id: true,
						},
				  }
				: false,
		},
		orderBy: { updatedAt: 'desc' },
	});

	return review;
};
