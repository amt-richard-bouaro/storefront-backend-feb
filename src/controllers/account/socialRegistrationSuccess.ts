import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { SERVER_CONFIG } from '../../config';

export const socialRegistrationSuccess = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	return res.redirect(
		`${SERVER_CONFIG.CLIENT_ORIGIN}/login?storefront-connect=${
			req.flash().error
		}`
	);
};
