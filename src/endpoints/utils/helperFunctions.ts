import { MAIL_OPTIONS } from '../../services/generalTypes';
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
		transport.sendMail(mailOptions, callback);
	} catch (err) {
		if (err.code === 'ENOTFOUND') {
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
