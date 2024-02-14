import bcrypt from 'bcrypt';
import { SERVER_CONFIG } from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PROMOTION } from '../interfaces/types/store';

export const uuid = (length: number): string => {
	const characters =
		'$abcdefghijklmnopqrstuvwxyz$ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789';
	const randomNumbers = Array.from({ length }, () =>
		Math.floor(Math.random() * characters.length)
	);
	const randomString = randomNumbers
		.map((randomNumber) => characters[randomNumber])
		.join('');

	return randomString;
};

export const passwordValidator = async (
	password: string,
	validateWith: string
): Promise<boolean> => {
	const isValid = await bcrypt.compare(password, validateWith);

	return isValid;
};

export const shortCodeGenerator = async (
	length: number,
	includeSpecialChar: boolean = false
): Promise<string> => {
	const code = uuid(length).toUpperCase();
	return !includeSpecialChar ? code.replace(/\W/g, '0') : code;
};

interface JWT_PAYLOAD extends JwtPayload {
	email: string;
	code: string;
}

export const jwtGenerator = <T extends { email: string; code: string }>(
	data: T
): string => {
	const token = jwt.sign(data, SERVER_CONFIG.JWT_SECRET, {
		expiresIn: '1h',
	});

	return token;
};

export const extractJwtPayload = (token: string) => {
	const payload: JWT_PAYLOAD = jwt.verify(
		token,
		SERVER_CONFIG.JWT_SECRET
	) as JWT_PAYLOAD;

	return payload;
};

export const flatNestedObject = (data: { [key: string]: any | object }) => {
	const flatData: { [key: string]: string | number | boolean } = {};

	for (const key in data) {
		if (typeof data[key] === 'object') {
			const nestedData = data[key];
			for (const nestedKey in nestedData) {
				flatData[nestedKey] = nestedData[nestedKey];
			}
		} else {
			flatData[key] = data[key];
		}
	}

	return flatData;
};

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
};

export const groupVariations = (
	variations: {
		id: string;
		type: string;
		value: string;
		product: string;
	}[]
) => {
	const groupedVariations: { type: string; values: string[] }[] = [];

	variations.forEach((variant) => {
		const { type, value } = variant;
		const existingGroup = groupedVariations.find(
			(group) => group.type === type
		);

		if (existingGroup) {
			existingGroup.values.push(value);
		} else {
			groupedVariations.push({ type, values: [value] });
		}
	});

	return groupedVariations;
};

interface rating {
	rating: number;
}
export const getTotalRating = (reviews: rating[]): number => {
	return reviews.length > 0
		? Math.ceil(
				reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
		  )
		: 0;
};

export const setDiscount = (
	discount: number,
	promo: Pick<PROMOTION, 'name' | 'discount' | 'end' | 'start'>
): number => {
	if (!promo || promo.end < new Date()) {
		return discount;
	}

	return promo.discount;
};

export const validateCreditCard = (cardNumber: string): boolean => {
	const cleanedCardNumber = cardNumber.replace(/\D/g, '');

	if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
		return false;
	}

	const digits = cleanedCardNumber.split('').map(Number);

	let sum = 0;
	let isAlternate = false;

	for (let i = digits.length - 1; i >= 0; i--) {
		let digit = digits[i];

		if (isAlternate) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}

		sum += digit;
		isAlternate = !isAlternate;
	}

	return sum % 10 === 0;
};
