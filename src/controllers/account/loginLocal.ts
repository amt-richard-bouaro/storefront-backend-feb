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

		const updatedUser = await activateAccount(user.id);

		if (!updatedUser) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.LOGIN_FAILED.CODE,
				message: AUTH_MSG.LOGIN_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const data = {
			id: updatedUser.id,
			email: updatedUser.email,
			type: updatedUser.type,
			verified: updatedUser.verified,
			isActive: updatedUser.isActive,
			mustChangePassword: updatedUser.mustChangePassword,
			canResetPassword: updatedUser.canResetPassword,
			createdAt: updatedUser.createdAt,
			updatedAt: updatedUser.updatedAt,
			customer: updatedUser.customer && updatedUser.customer.id,
			business: updatedUser.business && updatedUser.business.id,
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
