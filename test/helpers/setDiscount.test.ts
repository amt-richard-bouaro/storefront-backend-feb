import { setDiscount } from '../../src/helpers';

test('should group array of virations by type', async () => {
	const promotion: {
		id: string;
		name: string;
		statement: string;
		discount: number;
		start: Date;
		end: Date;
		store: string;
		createdAt: Date;
		updatedAt: Date;
	} = {
		id: '1_id',
		name: 'promotion_name',
		statement: 'Best deals',
		discount: 10,
		start: new Date('2023-10-06 14:56:32.739'),
		end: new Date('2023-11-06 14:56:32.739'),
		store: 'store_id',
		createdAt: new Date('2023-10-06 14:56:32.739'),
		updatedAt: new Date('2023-10-06 14:56:32.739'),
	};

	const discount = setDiscount(5, promotion);

	promotion.end < new Date()
		? expect(discount).toEqual(5)
		: expect(discount).toEqual(10);

	expect(discount).not.toBe(null);
});
