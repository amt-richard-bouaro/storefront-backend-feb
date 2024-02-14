import { ERROR_MSG } from './../../constants/api/messages/errors';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../errorhandlers/exceptions';
import { ACCOUNTS, CHECKS, USER } from '../../interfaces/types';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { findAccountById } from '../../services/app/account/findAccount';
import { AUTH_MSG } from '../../constants/api/messages/auth';

export const restrictedTo =
	(to?: ACCOUNTS[]) =>
	async (req: Request, res: Response<RESPONSE>, next: NextFunction) => {
		try {
			if (!req.isAuthenticated()) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Permission denied. Please make sure you have permission to access this resource',
					type: 'error',
				});
			}

			const requestUser = <REQUEST_WITH_USER>req.user;

			const user = await findAccountById(requestUser.id);

			if (!user) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message: 'Unauthorized: Could not find any user',
					type: 'error',
				});
			}

			const foundUser = user;

			if (to && !to.includes(foundUser.type)) {
				return res.status(STATUS.FORBIDDEN).json({
					code: ERROR_MSG.FORBIDDEN.CODE,
					message: ERROR_MSG.FORBIDDEN.MESSAGE,
					type: 'error',
				});
			}

			if (
				!foundUser.isActive ||
				!foundUser.verified ||
				foundUser.mustChangePassword
			) {
				return res.status(STATUS.FORBIDDEN).json({
					code: ERROR_MSG.FORBIDDEN.CODE,
					message: !foundUser.verified
						? `${ERROR_MSG.FORBIDDEN.MESSAGE} Account is not verified. You can request for verification.`
						: foundUser.mustChangePassword
						? `${ERROR_MSG.FORBIDDEN.MESSAGE} You must change your password before you can continue`
						: !foundUser.isActive
						? `${ERROR_MSG.FORBIDDEN.MESSAGE} Account is not actived.`
						: ERROR_MSG.FORBIDDEN.MESSAGE,
					type: 'error',
				});
			}

			return next();
		} catch (error) {
			const err = error as Error;

			errorHandler(err, req, res);
		}
	};

export const checkIf =
	(check?: CHECKS[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.isAuthenticated()) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Permission denied. Please make sure you have permission to access this resource',
					type: 'error',
				});
			}

			const requestUser = <REQUEST_WITH_USER>req.user;

			const user = await findAccountById(requestUser.id);

			if (!user) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message: 'Unauthorized: Could not find any user',
					type: 'error',
				});
			}

			const foundUser = user as USER;

			if (check && check.includes('verified') && !foundUser.verified) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Restricted Access: Resources are limited to verified accounts',
					type: 'error',
				});
			}

			if (
				check &&
				check.includes('mustChangePassword') &&
				!foundUser.mustChangePassword
			) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Restricted Access: You are not allowed to change your password at this moment.',
					type: 'error',
				});
			}

			if (
				check &&
				check.includes('canResetPassword') &&
				!foundUser.canResetPassword
			) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Restricted Access: Make sure you have gone through the process of verifying your reseting password request.',
					type: 'error',
				});
			}

			if (check && check.includes('isActive') && !foundUser.isActive) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Restricted Access: Account is inactive at this moment. You can log in again to continue.',
					type: 'error',
				});
			}

			next();
		} catch (error) {
			const err = error as Error;

			errorHandler(err, req, res);
		}
	};

export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.isAuthenticated()) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: ERROR_MSG.UNAUTHORIZED.CODE,
				message: ERROR_MSG.UNAUTHORIZED.MESSAGE,
				type: 'error',
			});
		}

		const requestUser = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(requestUser.id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: AUTH_MSG.USER_NOT_FOUND.CODE,
				message: AUTH_MSG.USER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}
		next();
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
