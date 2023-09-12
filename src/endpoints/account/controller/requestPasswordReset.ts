import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { findAccountByEmail } from '../../utils/operations/readOperations';
import { EMAIL } from '../types';
import {
	jwtGenerator,
	mailOptions,
	sendMail,
	shortCodeGenerator,
} from '../../utils/helperFunctions';
import { updateResetStatus } from '../../utils/operations/updateOperations';
import emailVerification from '../../../services/templates/emailVerification';

export const requestPasswordReset = async (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	try {
		const email = req.body.email;

		EMAIL.parse(email);

		const user = await findAccountByEmail(email);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REQUEST_FAILED',
				message: 'Could not find your account in the system',
				type: 'error',
			});
		}

		const code = await shortCodeGenerator(6);

		const resetToken = jwtGenerator({ email, code });

		await updateResetStatus(email, resetToken);

		const name =
			user.type === 'Business'
				? user.business.businessName
				: user.customer.firstName;
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

		passport.authenticate('local-auth', { session: true })(req, res, () => {
			return res.status(STATUS.OK).json({
				code: 'REQUEST_CODE_CREATED',
				message:
					'Your request has been accepted. A mail has already been sent to your email address with instructions to reset your password.',
				type: 'success',
			});
		});
	} catch (error) {
		const err = error as Error;
		return next(err);
	}
};
