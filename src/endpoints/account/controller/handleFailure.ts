import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';

export const handleFailure = (req: Request, res: Response<RESPONSE>) => {
	req.logout((err) => {
		if (err) {
			throw new Error(err);
		}
	});

	req.session.cookie.maxAge = 0;

	res.cookie('connect.sid', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	return res.status(STATUS.UNAUTHORIZED).json({
		code: 'UNAUTHORIZED',
		message: `Could not authenticate user. ${req.flash('error')[0]}`,
		type: 'error',
	});
};
