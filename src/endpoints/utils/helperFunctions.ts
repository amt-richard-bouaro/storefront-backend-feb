import { MAIL_OPTIONS, PRODUCT } from '../../services/generalTypes';
import bcrypt from 'bcrypt';
import { SERVER_CONFIG, STATUS } from '../../config/main';
import { v4 as uuidV4 } from 'uuid';
import jwt, { JwtPayload } from 'jsonwebtoken';
import nodemailer, { SentMessageInfo } from 'nodemailer';

export const passwordValidator = async (
	password: string,
	validateWith: string
): Promise<boolean> => {
	const isValid = await bcrypt.compare(password, validateWith);

	return isValid;
};

export const shortCodeGenerator = async (length: number): Promise<string> => {
	const code = uuidV4()
		.replace(/^[a-zA-Z\d]/, '')
		.toUpperCase()
		.slice(0, length);
	return code;
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

const transport = nodemailer.createTransport({
	service: SERVER_CONFIG.EMAIL_SERVICE,
	host: SERVER_CONFIG.EMAIL_HOST,
	port: Number(SERVER_CONFIG.EMAIL_PORT),
	secure: true,
	auth: {
		user: SERVER_CONFIG?.EMAIL_ADDRESS,
		pass: SERVER_CONFIG?.EMAIL_PASSWORD,
	},
});

export const mailOptions = (options: MAIL_OPTIONS) => {
	return {
		from:
			{
				name: 'Store Front',
				address: SERVER_CONFIG.EMAIL_ADDRESS,
			} || options.from,
		to: options.to,
		subject: options.subject,
		text: options.text || '',
		html: options.html || '',
	};
};

export const sendMail = async (
	mailOptions: MAIL_OPTIONS,
	callback?: (err: Error | null, info: SentMessageInfo) => void
) => {
	try {
		callback
			? transport.sendMail(mailOptions, callback)
			: transport.sendMail(mailOptions);
	} catch (error) {
		const err = error as Error;
		if (err.name === 'ENOTFOUND') {
			return {
				status: STATUS.NOT_FOUND,
				message: 'The email server could not be found.',
			};
		} else {
			return {
				status: STATUS.INTERNAL_SERVER_ERROR,
				message: 'An error occurred while sending the email.',
			};
		}
	}
};

export const flatNestedObject = (data: { [key: string]: any }) => {
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

export const productsAvailability = (
	products: PRODUCT[],
	items: { product: string; quantity: number }[]
) => {
	const unavailbleProducts: {
		product: string;
		quantity: number;
		instock: number;
		reason: string;
	}[] = [];

	items.map((item) => {
		const productFound = products.find(
			(product) => product.id === item.product
		);
		if (productFound === undefined) {
			unavailbleProducts.push({
				...item,
				instock: 0,
				reason: 'Product not found',
			});
		} else if (productFound.quantity < item.quantity) {
			unavailbleProducts.push({
				...item,
				instock: productFound.quantity,
				reason: 'Stock quantity insufficient',
			});
		}
	});

	return unavailbleProducts;
};

export const totalAmountToPay = (
	products: PRODUCT[],
	items: { product: string; quantity: number }[]
): number => {
	const itemIDs: string[] = items.map((item) => item.product);

	const orderedItems = products.filter((product) =>
		itemIDs.includes(product.id)
	);

	let total: number = 0;

	orderedItems.map((product) => {
		const item = items.find((item) => item.product === product.id);

		if (item !== undefined) {
			const discount =
				product.discount > 0
					? (product.discount / 100) * product.price * item.quantity
					: 0;

			const amount = item.quantity * product.price - discount;

			total = total + amount;
		}
	});

	return Number(total.toFixed(2));
};
