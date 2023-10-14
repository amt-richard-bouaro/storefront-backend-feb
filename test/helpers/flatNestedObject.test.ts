import { flatNestedObject } from '../../src/helpers';

test('should flatten nested object to have one level properties', async () => {
	const data: {
		email: string;
		code: string;
		level: { name: string; size: number };
	} = {
		email: 'something@funny.com',
		code: 'poew023',
		level: {
			name: 'Kwame',
			size: 4,
		},
	};

	const nestedObject = flatNestedObject(data);

	expect(nestedObject).toStrictEqual({
		email: 'something@funny.com',
		code: 'poew023',
		name: 'Kwame',
		size: 4,
	});
	expect(nestedObject).not.toBe(null);
	expect(nestedObject).toHaveProperty('email');
	expect(nestedObject).toHaveProperty('code');
});
