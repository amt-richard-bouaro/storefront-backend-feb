import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { USER } from '../../interfaces/types';
import { activateAccount } from '../../services/app/account/activateAccount';

export const localLogin = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const user: USER = req.user as USER;

		await activateAccount(user.id);

		return res.status(STATUS.OK).json({
			code: 'LOGGED_IN',
			message: 'Logged in successfully',
			type: 'success',
			data: {
				id: user.id,
				email: user.email,
				type: user.type,
				verified: user.verified,
				isActive: user.isActive,
				mustChangePassword: user.mustChangePassword,
				canResetPassword: user.canResetPassword,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				customer: user.customer && user.customer.id,
				business: user.business && user.business.id,
			},
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
