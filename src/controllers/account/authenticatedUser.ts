import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { findAccountById } from '../../services/app/account/findAccount';
import { cachResult, getCachedResult } from '../../extensions/redis';
import { AUTH_MSG } from '../../constants/api/messages/auth';

export const authenticatedUser = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestUser = <REQUEST_WITH_USER>req.user;

		const cachedResult = await getCachedResult(requestUser.id);

		const user = cachedResult
			? cachedResult
			: await findAccountById(requestUser.id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: AUTH_MSG.USER_NOT_FOUND.CODE,
				message: AUTH_MSG.USER_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

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
			customer: user.customer ? user.customer.id : null,
			business: user.business ? user.business.id : null,
		};

		cachResult(requestUser.id, data, 15);

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.USER_FOUND.CODE,
			message: AUTH_MSG.USER_FOUND.MESSAGE,
			type: 'success',
			data,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
