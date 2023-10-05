import { Database } from '../../../extensions/dbClient';
import { REVIEW } from '../../../interfaces/types';

export const findReviewByUniques = async (
	id: string
): Promise<REVIEW | null> => {
	const review = await Database.review.findFirst({
		where: {
			OR: [{ id }, { order: id }, { customer: id }],
		},
	});

	return review;
};
