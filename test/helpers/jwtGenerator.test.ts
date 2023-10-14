import { jwtGenerator, extractJwtPayload } from '../../src/helpers';

test('should generate a unique code of the specified length', async () => {
	const data: { email: string; code: string } = {
		email: 'something@funny.com',
		code: 'poew023',
	};

	const token = jwtGenerator(data);

	expect(token).not.toHaveProperty('code');
	expect(token).not.toHaveProperty('email');

	const result = extractJwtPayload(token);
	expect(result).toHaveProperty('email');
	expect(result).toHaveProperty('code');
});
