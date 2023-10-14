import { uuid } from '../../src/helpers';

test('should generate a random string of the specified length', () => {
	const uuidLength = 10;
	const uuidString = uuid(uuidLength);

	expect(uuidString.length).toEqual(uuidLength);
});

test('should generate a different string each time', () => {
	const uuidString1 = uuid(10);
	const uuidString2 = uuid(10);

	expect(uuidString1).not.toEqual(uuidString2);
});
