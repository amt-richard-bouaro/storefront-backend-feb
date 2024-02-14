import { MAIL_OPTIONS } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { SERVER_CONFIG } from '../../config';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import { ERROR_MSG } from '../../constants/api/messages';

const transport = nodemailer.createTransport({
	service: 'gmail',
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
		await new Promise((resolve, reject) => {
			// verify connection configuration
			transport.verify(function (error, success) {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					console.log('Server is ready to take our messages');
					resolve(success);
				}
			});
		});

		await new Promise((resolve, reject) => {
			// send mail
			transport.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					// console.log(info);
					resolve(info);
				}
			});
		});

		callback && console.log('callback called');

		// callback
		// 	? transport.sendMail(mailOptions, callback)
		// 	: transport.sendMail(mailOptions);
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
				message: ERROR_MSG.INTERNAL_SERVER_ERROR.MESSAGE,
			};
		}
	}
};
