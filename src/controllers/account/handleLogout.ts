import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import logger from '../../middlewares/logger';

export const handleLogout = async (req: Request, res: Response<RESPONSE>) => {
	try {
		if (!req.isAuthenticated()) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: AUTH_MSG.LOGOUT_FAILED.CODE,
				message: AUTH_MSG.LOGOUT_FAILED.MESSAGE,
				type: 'error',
			});
		}
		req.logout((err) => {
			if (err) {
				return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
					code: AUTH_MSG.LOGOUT_FAILED.CODE,
					message: AUTH_MSG.LOGOUT_FAILED.MESSAGE,
					type: 'error',
				});
			}
		});

		res.clearCookie('capstone-storefront');

		req.logout(function (err) {
			logger.error(err);
			req.session.destroy(function (err) {
				logger.error(err);
			});
		});

		req.session.cookie.maxAge = 0;

		res.cookie('capstone-storefront', '', {
			httpOnly: true,
			expires: new Date(0),
		});

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.LOGOUT_SUCCESSFUL.CODE,
			message: AUTH_MSG.LOGOUT_SUCCESSFUL.MESSAGE,
			type: 'error',
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
