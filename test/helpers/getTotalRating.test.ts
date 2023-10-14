import { getTotalRating } from '../../src/helpers';

interface rating {
	rating: number;
	id: string;
	comment: string;
}

test('should return the average number of ratings passed as arg[]', async () => {
	const reviews: rating[] = [
		{ id: '1', comment: 'This is a comment', rating: 4 },
		{ id: '1', comment: 'This is a comment', rating: 3 },
	];

	const ratings = getTotalRating(reviews);

	expect(ratings).toEqual(4);
});
