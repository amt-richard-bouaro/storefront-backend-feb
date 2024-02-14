import { validateCreditCard } from '../../src/helpers';

test('should validate card number and return boolean', async () => {
	const card: string = '4111 1111 1111 1111';

	const isValid = validateCreditCard(card);

	expect(isValid).toEqual(true);

	const card2: string = '4111111111111111';

	const isAlsoValid = validateCreditCard(card2);

	expect(isAlsoValid).toEqual(true);

	const card3: string = '41111144411111';

	const isNotValid = validateCreditCard(card3);

	expect(isNotValid).not.toEqual(true);
});
