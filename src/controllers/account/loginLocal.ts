import { Request, Response } from 'express';
import { RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { USER } from '../../interfaces/types';
import { activateAccount } from '../../services/app/account/activateAccount';
import { AUTH_MSG } from '../../constants/api/messages/auth';

export const localLogin = async (req: Request, res: Response<RESPONSE>) => {
	try {
		const user: USER = req.user as USER;

		await activateAccount(user.id);

		const data = {
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
		};

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.LOGIN_SUCCESSFUL.CODE,
			message: AUTH_MSG.LOGIN_SUCCESSFUL.MESSAGE,
			type: 'success',
			data,
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
