import { passwordValidator } from '../../src/helpers';

test('should validate password plain test against encrypted password', async () => {
	const password: string = 'passWorD@1';
	const validateWith: string =
		'klmnopqrstuvwxyz$ABCDEFGHIJKLMNOPQRSTUVWXYZ$012';

	const result = await passwordValidator(password, validateWith);

	expect(result).toBeDefined();
	expect(result).toBeFalsy();
});
