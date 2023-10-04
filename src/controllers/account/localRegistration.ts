import { Request, Response } from 'express';
import passport from 'passport';
import { RESPONSE } from '../../interfaces';
import { NEW_ACCOUNT } from '../../validations/account';
import { findAccountByEmail } from '../../services/app/account/findAccount';
import { STATUS } from '../../config/statusCode';
import { createAccount } from '../../services/app/account/createAccount';
import { mailOptions, sendMail } from '../../services/email/mailingConfig';
import emailVerification from '../../views/templates/emailVerification';
import { errorHandler } from '../../middlewares/errorhandlers/exceptions';

export const localRegistration = async (
	req: Request,
	res: Response<RESPONSE>
) => {
	const requestBody = req.body;

	try {
		NEW_ACCOUNT.parse(requestBody);

		const userExist = await findAccountByEmail(requestBody.email);

		if (userExist) {
			return res.status(STATUS.CONFLICT).json({
				code: 'USER_ALREADY_EXIST',
				message:
					'There is already a user with that email. If you are the owner of this email, you might want to login instead.',
				type: 'error',
			});
		}

		const data: NEW_ACCOUNT = {
			email: requestBody.email,
			password: requestBody.password,
			confirmPassword: requestBody.password,
			provider: 'local',
			type: requestBody.type,
			verified: false,
			isActive: false,
			firstName: requestBody?.firstName,
			lastName: requestBody?.lastName,
			businessName: requestBody?.businessName,
		};

		const { user: User, email, code } = await createAccount(data);

		if (!User) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: 'UNEXPECTED_ERROR',
				message: 'Error occurred: Unexpected error occurred',
				type: 'error',
			});
		}

		const name = data.businessName ? data.businessName : data.firstName;

		sendMail(
			mailOptions({
				to: email,
				subject: 'Email Verification',
				html: emailVerification(name!, code),
			}),
			(err) => {
				if (err) {
					// console.log(err)
				}
			}
		);

		passport.authenticate('local-auth', { session: true })(req, res, () => {
			return res.status(STATUS.CREATED).json({
				code: 'REGISTRATION_SUCCESS',
				message:
					'Account has been successfully created. A mail has already been sent to your email address with instructions to verify your account.',
				type: 'success',
				data: User,
			});
		});
	} catch (error) {
		const err = error as Error;
		errorHandler(err, req, res);
	}
};
