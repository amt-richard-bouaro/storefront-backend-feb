import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import logger from '../../middlewares/logger';
import { SERVER_CONFIG } from '../../config';

export const socialRegFailure = async (
	req: Request,
	res: Response<RESPONSE>
) => {
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

	return res.redirect(
		`${SERVER_CONFIG.CLIENT_ORIGIN}/signUp?storefront-connect=${
			req.flash().error
		}`
	);
};
