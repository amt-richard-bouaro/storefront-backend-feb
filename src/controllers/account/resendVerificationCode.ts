import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { jwtGenerator, shortCodeGenerator } from '../../helpers';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import emailVerification from '../../views/templates/emailVerification';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { findAccountById } from '../../services/app/account/findAccount';
import { updateVerificationCode } from '../../services/app/account/updateVerificationCode';

export const resendVerificationCode = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		const { id } = <REQUEST_WITH_USER>req.user;

		const user = await findAccountById(id);

		if (!user) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'REQUEST_FAILED',
				message: 'Could not find your account in the system',
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
					// console.log(err)
				}
			}
		);

		return res.status(STATUS.OK).json({
			code: 'VERIFICATION_CODE_SENT',
			message:
				'Your request has been accepted. A mail has already been sent to your email address with instructions to verify your account.',
			type: 'success',
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
