import { Request, Response } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../interfaces';
import { NEW_ACCOUNT } from '../../validations/account';
import { findAccountByEmail } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { createAccount } from '../../services/app/account/createAccount';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import emailVerification from '../../views/templates/emailVerification';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import { ERROR_MSG } from '../../constants/api/messages';
import logger from '../../middlewares/logger';

export const localRegistration = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestBody = req.body;

		NEW_ACCOUNT.parse(requestBody);

		const userExist = await findAccountByEmail(requestBody.email);

		if (userExist) {
			return res.status(STATUS.CONFLICT).json({
				code: AUTH_MSG.EMAIL_ALREADY_IN_USE.CODE,
				message: AUTH_MSG.EMAIL_ALREADY_IN_USE.MESSAGE,
				type: 'error',
			});
		}

		const data: NEW_ACCOUNT = {
			email: requestBody.email,
			password: requestBody.password,
			confirmPassword: requestBody.password,
			provider: 'local',
			type: requestBody.type,
			verified: false,
			isActive: false,
			firstName: requestBody?.firstName,
			lastName: requestBody?.lastName,
			businessName: requestBody?.businessName,
		};

		const { user: User, email, code } = await createAccount(data);

		if (!User) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: ERROR_MSG.INTERNAL_SERVER_ERROR.CODE,
				message: ERROR_MSG.INTERNAL_SERVER_ERROR.MESSAGE,
				type: 'error',
			});
		}

		const name = data.businessName ? data.businessName : data.firstName;

		sendMail(
			mailOptions({
				to: email,
				subject: 'Email Verification',
				html: emailVerification(name!, code),
			}),
			(err) => {
				if (err) {
					logger.error(err);
				}
			}
		);

		passport.authenticate('local-auth', { session: true })(req, res, () => {
			return res.status(STATUS.CREATED).json({
				code: AUTH_MSG.ACCOUNT_CREATED_SUCCESSFULLY.CODE,
				message: AUTH_MSG.ACCOUNT_CREATED_SUCCESSFULLY.MESSAGE,
				type: 'success',
				data: User,
			});
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
