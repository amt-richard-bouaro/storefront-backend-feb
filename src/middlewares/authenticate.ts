import { Request, Response, NextFunction } from 'express';
import { STATUS } from '../config/main';
import {
	REQUEST_WITH_USER,
	USER,
	ACCOUNTS,
	RESPONSE,
	CHECKS,
} from '../services/generalTypes';
import { findAccountById } from '../endpoints/utils/operations/readOperations';
import { errorHandler } from './errorHandlers';

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

			const foundUser = user as USER;

			if (to && !to.includes(foundUser.type)) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message:
						'Restricted Access: You do not have permission to access this resource',
					type: 'error',
				});
			}

			if (
				!foundUser.isActive ||
				!foundUser.verified ||
				foundUser.mustChangePassword
			) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: 'UNAUTHORIZED',
					message: !foundUser.verified
						? 'Account is not verified. You can request for verification.'
						: foundUser.mustChangePassword
						? 'You must change your password before you can continue'
						: !foundUser.isActive
						? 'Account is not actived.'
						: 'You are not authorized',
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
		next();
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
