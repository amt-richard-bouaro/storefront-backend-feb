import { shortCodeGenerator } from '../../src/helpers';

test('should generate a unique code of the specified length', async () => {
	const length: number = 8;

	const result = await shortCodeGenerator(length);

	expect(result).toBeDefined();
	expect(result).toHaveLength(8);
});
