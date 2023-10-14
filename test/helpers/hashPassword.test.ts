import { hashPassword } from '../../src/helpers';

test('should hash plain text', async () => {
	const password: string = 'Password@1';

	const hashedPass = await hashPassword(password);

	expect(hashedPass).not.toEqual('Password@1');
	expect(hashedPass).not.toHaveLength(10);
});
