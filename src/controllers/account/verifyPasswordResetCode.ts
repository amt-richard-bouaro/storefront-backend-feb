import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { CODE } from '../../validations/account';
import { findAccountById } from '../../services/app/account/findAccount';
import { extractJwtPayload } from '../../helpers';
import { allowResetPassword } from '../../services/app/account/allowResetPassword';
import { AUTH_MSG } from '../../constants/api/messages/auth';

export const verifyPasswordResetCode = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CODE.parse(req.body);

		const { code } = req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.EMAIL_VERIFICATION_FAILED.CODE,
				message: AUTH_MSG.EMAIL_VERIFICATION_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const userVerificationToken = extractJwtPayload(user.verificationToken!);

		if (userVerificationToken.code !== code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.RESET_PASSWORD_FAILED.CODE,
				message: AUTH_MSG.RESET_PASSWORD_FAILED.CODE,
				type: 'error',
			});
		}

		const updatedUser = await allowResetPassword(id);

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
			customer: updatedUser.customer,
			business: updatedUser.business,
		};

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.CODE_VERIFED.CODE,
			message: AUTH_MSG.CODE_VERIFED.MESSAGE,
			type: 'success',
			data,
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
