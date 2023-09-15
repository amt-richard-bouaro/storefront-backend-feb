import { Request, Response } from 'express';
import passport from 'passport';
import { REQUEST_WITH_USER, RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { findAccountById } from '../../utils/operations/readOperations';
import {
	extractJwtPayload,
	mailOptions,
	sendMail,
} from '../../utils/helperFunctions';
import { verifyAccount } from '../../utils/operations/updateOperations';
import { CODE } from '../types';
import emailVerified from '../../../services/templates/emailVerified';
import { errorHandler } from '../../../middlewares/errorHandlers';

export const accountVerification = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	const code = req.body.code;

	try {
		CODE.parse(code);

		const { id } = <REQUEST_WITH_USER>req.user;

		const User = await findAccountById(id);

		if (!User) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'INVALID_REQUEST',
				message:
					'Could not verify the email address because the request contained invalid data.',
				type: 'error',
			});
		}

		if (User.verified) {
			return res.status(STATUS.OK).json({
				code: 'ACCOUNT_VERIFIED',
				message: 'Account is verified',
				type: 'success',
			});
		}

		const userVerificationToken = extractJwtPayload(User.verificationToken);

		if (userVerificationToken.code !== code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'INVALID_REQUEST',
				message:
					'Could not verify the email address because the request contained invalid data.',
				type: 'error',
			});
		}

		const verifiedUser = await verifyAccount(User.id);

		const user =
			verifiedUser.type === 'Business'
				? verifiedUser.business.businessName
				: verifiedUser.customer.firstName;

		await sendMail(
			mailOptions({
				to: verifiedUser.email,
				subject: 'Email Verified',
				html: emailVerified(user),
			}),
			(err) => {
				if (err) {
					// console.log(err)
				}
			}
		);

		passport.authenticate('local', { session: false })(req, res, () => {
			return res.status(STATUS.OK).json({
				code: 'ACCOUNT_VERIFIED',
				message: 'Account is verified',
				type: 'success',
				data: verifiedUser,
			});
		});
	} catch (error) {
		const err = error as Error;

		errorHandler(err, req, res);
	}
};
