import { Request, Response } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../interfaces';
import { EMAIL } from '../../validations/account';
import { findAccountByEmail } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { jwtGenerator, shortCodeGenerator } from '../../helpers';
import { updateResetStatus } from '../../services/app/account/updateResetStatus';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import emailVerification from '../../views/templates/emailVerification';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

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
				code: 'REQUEST_FAILED',
				message: 'Could not find your account in the system',
				type: 'error',
			});
		}

		if (user && user.provider !== 'local') {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REQUEST_DENIED',
				message:
					'Your account is registered with third party service hence, we cannot reset your password.',
				type: 'error',
			});
		}

		const code = await shortCodeGenerator(6);

		const resetToken = jwtGenerator({ email, code });

		await updateResetStatus(email, resetToken);

		const name =
			user.type === 'Business'
				? user.business!.businessName
				: user.customer!.firstName;
		await sendMail(
			mailOptions({
				to: email,
				subject: 'Reset Password Request',
				html: emailVerification(name, code),
			}),
			(err) => {
				if (err) {
					// console.log(err)
				}
			}
		);

		req.body.password = resetToken;

		passport.authenticate('local-auth')(req, res, () => {
			return res.status(STATUS.OK).json({
				code: 'REQUEST_CODE_CREATED',
				message:
					'Your request has been accepted. A mail has already been sent to your email address with instructions to reset your password.',
				type: 'success',
			});
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
