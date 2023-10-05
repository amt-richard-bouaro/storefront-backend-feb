import { Database } from '../../../extensions/dbClient';
import { REVIEW } from '../../../interfaces/types';

export const createReview = async (data: {
	rating: number;
	comment?: string;
	remarks: 'Disappointing' | 'Outstanding' | 'Satisfactory';
	customer: string;
	product: string;
	store: string;
	order: string;
}): Promise<REVIEW | null> => {
	const review = await Database.review.create({
		data: {
			rating: data.rating,
			comment: data.comment,
			remarks: data.remarks,
			customer: data.customer,
			product: data.product,
			store: data.store,
			order: data.order,
		},
	});

	return review;
};
