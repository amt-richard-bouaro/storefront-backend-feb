import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
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

	req.session.cookie.maxAge = 0;

	res.cookie('connect.sid', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	const CLIENT_ORIGIN = (await getCachedResult('client-origin')) as {
		origin: string;
	};
	console.log(CLIENT_ORIGIN);

	return res.redirect(
		`${CLIENT_ORIGIN.origin}/login?storefront-connect=${req.flash().error}`
	);
};
