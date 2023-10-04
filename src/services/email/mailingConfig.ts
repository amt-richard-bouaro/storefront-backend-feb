import { MAIL_OPTIONS } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { SERVER_CONFIG } from '../../config';
import nodemailer, { SentMessageInfo } from 'nodemailer';

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
