import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { AUTH_MSG } from '../../constants/api/messages/auth';

export const handleFailure = (req: Request, res: Response<RESPONSE>) => {
	req.logout((err) => {
		if (err) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: AUTH_MSG.LOGOUT_FAILED.CODE,
				message: `${AUTH_MSG.LOGOUT_FAILED.MESSAGE} ${req.flash('error')[0]}`,
				type: 'error',
			});
		}
	});

	req.session.cookie.maxAge = 0;

	res.cookie('capstone-storefront', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	return res.status(STATUS.OK).json({
		code: AUTH_MSG.LOGIN_FAILED.CODE,
		message: `${AUTH_MSG.LOGIN_FAILED.MESSAGE} ${req.flash('error')[0]}`,
		type: 'error',
	});
};
