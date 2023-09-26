import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { findAccountById } from '../../utils/operations/readOperations';
import {
	jwtGenerator,
	mailOptions,
	sendMail,
	shortCodeGenerator,
} from '../../utils/helperFunctions';
import { updateVerificationCode } from '../../utils/operations/updateOperations';
import emailVerification from '../../../services/templates/emailVerification';
import { errorHandler } from '../../../middlewares/errorHandlers';

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
