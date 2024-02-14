import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { SERVER_CONFIG } from '../../config';
import logger from '../../middlewares/logger';

export const socialRegFailure = (req: Request, res: Response<RESPONSE>) => {
	req.logout((err) => {
		if (err) {
			logger.error(err);
		}
	});

	req.session.cookie.maxAge = 0;

	res.cookie('connect.sid', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	return res.redirect(
		`${SERVER_CONFIG.CLIENT_ORIGIN}/signUp?storefront-connect=${
			req.flash().error
		}`
	);
};
