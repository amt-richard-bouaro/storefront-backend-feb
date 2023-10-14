import { groupVariations } from '../../src/helpers';

test('should group array of virations by type', async () => {
	const variations: {
		id: string;
		type: string;
		value: string;
		product: string;
	}[] = [
		{
			id: 'some_v_id_1',
			type: 'color',
			value: '#000000',
			product: 'some_product_id',
		},
		{
			id: 'some_v_id_2',
			type: 'color',
			value: '#FFFFFF',
			product: 'some_product_id',
		},
		{
			id: 'some_v_id_3',
			type: 'Model',
			value: 'G2',
			product: 'some_product_id',
		},
	];

	const groupedVariations = groupVariations(variations);

	expect(groupedVariations).toStrictEqual([
		{
			type: 'color',
			values: ['#000000', '#FFFFFF'],
		},
		{
			type: 'Model',
			values: ['G2'],
		},
	]);

	expect(groupedVariations).not.toBe(null);
	expect(groupedVariations).toHaveLength(2);
});
