import { findAccountById } from './../../utils/operations/readOperations';
import { Request, Response, NextFunction } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { PASSWORDS } from '../types';
import { changePassword } from '../../utils/operations/updateOperations';

export const resetPassword = async (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	try {
		const passwords = req.body;

		PASSWORDS.parse(passwords);

		const { id } = <REQUEST_WITH_USER>req.user;

		const user = findAccountById(id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: 'PASSWORD_RESET_FAILED',
				message:
					'Could not verify the email address because the request contained invalid data.',
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
		next(err);
	}
};
