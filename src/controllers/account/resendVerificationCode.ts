import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { jwtGenerator, shortCodeGenerator } from '../../helpers';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import emailVerification from '../../views/templates/emailVerification';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAccountById } from '../../services/app/account/findAccount';
import { updateVerificationCode } from '../../services/app/account/updateVerificationCode';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import logger from '../../middlewares/logger';

export const resendVerificationCode = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.ACCOUNT_NOT_FOUND.CODE,
				message: AUTH_MSG.ACCOUNT_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		const code = await shortCodeGenerator(6);

		const token = jwtGenerator({ email: user.email, code });

		const updatedUser = await updateVerificationCode(id, token);

		const name =
			user.type === 'Business'
				? updatedUser.business!.businessName
				: updatedUser.customer!.firstName;

		await sendMail(
			mailOptions({
				to: user.email,
				subject: 'Email Verification',
				html: emailVerification(name, code),
			}),
			(err) => {
				if (err) {
					logger.error(err);
				}
			}
		);

		return res.status(STATUS.OK).json({
			code: AUTH_MSG.VERIFICATION_CODE_SENT.CODE,
			message: AUTH_MSG.VERIFICATION_CODE_SENT.MESSAGE,
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
