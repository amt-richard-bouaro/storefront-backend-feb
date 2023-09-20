import { errorHandler } from './../../../middlewares/errorHandlers';
import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { findAccountById } from '../../utils/operations/readOperations';

export const authenticatedUser = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const requestUser = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(requestUser.id);

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: 'UNAUTHORIZED',
				message: 'Unauthorized: Could not find any user',
				type: 'error',
			});
		}

		return res.status(STATUS.OK).json({
			code: 'USER_FOUND',
			message: 'User found',
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
				customer: user.customer,
				business: user.business,
			},
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
