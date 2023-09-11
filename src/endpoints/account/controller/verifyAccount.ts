import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../../services/generalTypes';
import { STATUS } from '../../../config/main';
import { findAccountByEmail } from '../../utils/operations/readOperations';
import {
	extractJwtPayload,
	mailOptions,
	sendMail,
} from '../../utils/helperFunctions';
import { verifyAccount } from '../../utils/operations/updateOperations';

export const accountVerification = async (
	req: Request<object, object, { code: string; email: string }>,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	const data = req.body;

	try {
		const User = await findAccountByEmail(data.email);

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

		if (userVerificationToken.code !== data.code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: 'INVALID_REQUEST',
				message:
					'Could not verify the email address because the request contained invalid data.',
				type: 'error',
			});
		}

		const verifiedUser = await verifyAccount(User.id);

		await sendMail(
			mailOptions({
				to: verifiedUser.email,
				subject: 'Email Verified',
				html: `<h1>Your email has been verified</h1>`,
			})
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

		next(err);
	}
};
