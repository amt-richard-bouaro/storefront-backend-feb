import { Request, Response } from 'express';
import { REQUEST_WITH_USER, RESPONSE } from '../../interfaces';
import { STATUS } from '../../config/statusCode';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';
import { CODE } from '../../validations/account';
import { findAccountById } from '../../services/app/account/findAccount';
import { extractJwtPayload } from '../../helpers';
import { verifyAccount } from '../../services/app/account/verifyAccount';
import emailVerified from '../../views/templates/emailVerified';
import { AUTH_MSG } from '../../constants/api/messages/auth';
import logger from '../../middlewares/logger';
export const accountVerification = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	try {
		CODE.parse(req.body);

		const { code } = req.body;

		const { id } = <REQUEST_WITH_USER>req.user;

		const User = await findAccountById(id);

		if (!User) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.ACCOUNT_NOT_FOUND.CODE,
				message: AUTH_MSG.ACCOUNT_NOT_FOUND.MESSAGE,
				type: 'error',
			});
		}

		if (User.verified) {
			return res.status(STATUS.OK).json({
				code: AUTH_MSG.EMAIL_VERIFIED_SUCCESSFULLY.CODE,
				message: AUTH_MSG.EMAIL_VERIFIED_SUCCESSFULLY.MESSAGE,
				type: 'success',
			});
		}

		const userVerificationToken = extractJwtPayload(User.verificationToken!);

		if (userVerificationToken.code !== code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: AUTH_MSG.EMAIL_VERIFICATION_FAILED.CODE,
				message: AUTH_MSG.EMAIL_VERIFICATION_FAILED.MESSAGE,
				type: 'error',
			});
		}

		const verifiedUser = await verifyAccount(User.id);

		const user =
			verifiedUser.type === 'Business'
				? verifiedUser.business!.businessName
				: verifiedUser.customer!.firstName;

		await sendMail(
			mailOptions({
				to: verifiedUser.email,
				subject: 'Email Verified',
				html: emailVerified(user),
			}),
			(err) => {
				if (err) {
					logger.error(err);
				}
			}
		);

		res.cookie('connect.sid', '', {
			httpOnly: true,
			expires: new Date(0),
		});

		const data = {
			id: verifiedUser.id,
			email: verifiedUser.email,
			type: verifiedUser.type,
			verified: verifiedUser.verified,
			isActive: verifiedUser.isActive,
			mustChangePassword: verifiedUser.mustChangePassword,
			canResetPassword: verifiedUser.canResetPassword,
			createdAt: verifiedUser.createdAt,
			updatedAt: verifiedUser.updatedAt,
			customer: verifiedUser.customer && verifiedUser.customer.id,
			business: verifiedUser.business && verifiedUser.business.id,
		};

		req.session.destroy((err) => {
			err && logger.error(err);
			return res.status(STATUS.OK).json({
				code: AUTH_MSG.EMAIL_VERIFIED_SUCCESSFULLY.CODE,
				message: AUTH_MSG.EMAIL_VERIFIED_SUCCESSFULLY.MESSAGE,
				type: 'success',
				data,
			});
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
