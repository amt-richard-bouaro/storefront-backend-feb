import { Request, Response } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../interfaces';
import { EMAIL } from '../../validations/account';
import { findAccountByEmail } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { jwtGenerator, shortCodeGenerator } from '../../helpers';
import { updateResetStatus } from '../../services/app/account/updateResetStatus';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import { ERROR_MSG } from '../../constants/api/messages';
import logger from '../../middlewares/logger';
import ejs from 'ejs';
import path from 'path';

export const requestPasswordReset = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const { email } = req.body;

		EMAIL.parse(email);

		const user = await findAccountByEmail(email);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.ACCOUNT_NOT_FOUND.CODE,
				message: AUTH_MSG.ACCOUNT_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		if (user && user.provider !== 'local') {
			return res.status(STATUS.BAD_REQUEST).json({
				code: ERROR_MSG.THIRD_PARTY_INVALID__REQUEST.CODE,
				message: ERROR_MSG.THIRD_PARTY_INVALID__REQUEST.MESSAGE,
				type: 'error',
			});
		}

		const code = (await shortCodeGenerator(6)).replaceAll(/\W/, '0');

		const resetToken = jwtGenerator({ email, code });

		await updateResetStatus(email, resetToken);

		const name =
			user.type === 'Business'
				? user.business!.businessName
				: user.customer!.firstName;

		const verificationData = await ejs.renderFile(
			path.resolve('src/views/templates/resetPassword.ejs'),
			{
				name,
				code,
			}
		);

		await sendMail(
			mailOptions({
				to: email,
				subject: 'Reset Password Request',
				html: verificationData,
			}),
			(err) => {
				if (err) {
					logger.error(err);
				}
			}
		);

		req.body.password = resetToken;

		passport.authenticate('local-auth')(req, res, () => {
			return res.status(STATUS.OK).json({
				code: AUTH_MSG.REQUEST_CODE_CREATED.CODE,
				message: AUTH_MSG.REQUEST_CODE_CREATED.MESSAGE,
				type: 'success',
			});
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
