import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { PASSWORDS } from '../../validations/account';
import { findAccountById } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { changePassword } from '../../services/app/account/changePassword';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const resetPassword = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const passwords = req.body;

		PASSWORDS.parse(passwords);

		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: 'PASSWORD_RESET_FAILED',
				message:
					'Could not verify the email address because the request contained invalid data.',
				type: 'error',
			});
		}

		if (!user.canResetPassword || !user.mustChangePassword) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: 'PASSWORD_RESET_FAILED',
				message:
					'You cannot change your passwor at this moment. Please start by requesting for password reset.',
				type: 'error',
			});
		}

		await changePassword({ id, password: passwords.password });

		req.logout((err) => {
			if (err) {
				throw new Error(err);
			}
		});

		req.session.cookie.maxAge = 0;

		return res.status(STATUS.OK).json({
			code: 'PASSWORD_RESET_SUCCESSFUL',
			message:
				'Your password has been successfully changed. Please login to continue',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
