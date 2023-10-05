import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { PASSWORDS } from '../../validations/account';
import { findAccountById } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { changePassword } from '../../services/app/account/changePassword';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import logger from '../../middlewares/logger';

export const resetPassword = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const passwords = req.body;

		PASSWORDS.parse(passwords);

		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: AUTH_MSG.RESET_PASSWORD_FAILED.CODE,
				message: AUTH_MSG.RESET_PASSWORD_FAILED.MESSAGE,
				type: 'error',
			});
		}

		if (!user.canResetPassword || !user.mustChangePassword) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: AUTH_MSG.RESET_PASSWORD_FAILED.CODE,
				message: AUTH_MSG.RESET_PASSWORD_FAILED.MESSAGE,
				type: 'error',
			});
		}

		await changePassword({ id, password: passwords.password });

		req.logout((err) => {
			if (err) {
				logger.error(err);
			}
		});

		req.session.cookie.maxAge = 0;

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.RESET_PASSWORD_SUCCESSFUL.CODE,
			message: AUTH_MSG.RESET_PASSWORD_SUCCESSFUL.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
