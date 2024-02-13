import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
// import { SERVER_CONFIG } from '../../config';
import logger from '../../middlewares/logger';
import { getCachedResult } from '../../extensions/redis';

export const socialLoginFailure = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	req.logout((err) => {
		if (err) {
			logger.error(err);
		}
	});
	const CLIENT_ORIGIN = await getCachedResult('client-origin');

	req.session.cookie.maxAge = 0;

	res.cookie('capstone-storefront', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	return res.redirect(
		`${CLIENT_ORIGIN}/login?storefront-connect=${req.flash().error}`
	);
};
