import { findAccountById } from './../../utils/operations/readOperations';
import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { CODE } from '../types';
import { extractJwtPayload } from '../../utils/helperFunctions';
import { allowResetPassword } from '../../utils/operations/updateOperations';
import { errorHandler } from '../../../middlewares/errorHandlers';

export const verifyPasswordResetCode = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const code = req.body.code;

		CODE.parse(code);

		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'VERIFICATION_FAILED',
				message: 'Could not verify code with current user',
				type: 'error',
			});
		}

		const userVerificationToken = extractJwtPayload(user.verificationToken);

		if (userVerificationToken.code !== code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'VERIFICATION_FAILED',
				message:
					'The provided verification code was not valid. Please try again with the right code.',
				type: 'error',
			});
		}

		const updatedUser = await allowResetPassword(id);

		return res.status(STATUS.OK).json({
			code: 'VERIFICATION_CODE_VERIFIED',
			message:
				'We have verified the provided verification code. You can now go ahead and set up your new password',
			type: 'success',
			data: {
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
			},
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
