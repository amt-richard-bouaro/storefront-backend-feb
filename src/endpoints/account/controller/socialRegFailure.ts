import { Request, Response } from 'express';
import { RESPONSE } from '../../../services/generalTypes';
import { SERVER_CONFIG } from '../../../config';

export const socialRegFailure = (req: Request, res: Response<RESPONSE>) => {
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

	return res.redirect(
		`${SERVER_CONFIG.CLIENT_ORIGIN}/signUp?storefront-connect=${
			req.flash().error
		}`
	);
};
