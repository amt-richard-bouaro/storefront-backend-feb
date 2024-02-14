import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { getCachedResult } from '../../extensions/redis';

export const socialRegistrationSuccess = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	const CLIENT_ORIGIN = (await getCachedResult('client-origin')) as {
		origin: string;
	};

	return res.redirect(
		`${CLIENT_ORIGIN.origin}/login?storefront-connect=${req.flash().error}`
	);
};
