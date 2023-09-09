import { Request, Response, NextFunction } from "express";
import { NEW_ACCOUNT } from "../types";
import { RESPONSE } from "../../../services/generalTypes";
import {
	findAccountByEmail,
	createAccount,
	sendMail,
	mailOptions,
} from "../../utils/reusableFunctions";
import { STATUS } from "../../../config/main";

export const localRegistration = async (
	req: Request<{}, {}, NEW_ACCOUNT>,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	const requestBody = req.body;

	try {
		NEW_ACCOUNT.parse(requestBody);

		const userExist = await findAccountByEmail(requestBody.email);

		if (userExist) {
			return res.status(STATUS.CONFLICT).json({
				code: "USER_ALREADY_EXIST",
				message:
					"There is already a user with that email. If you are the owner of this email, you might want to login instead.",
				type: "error",
			});
		}

		const data:NEW_ACCOUNT = {
			email: requestBody.email,
			password: requestBody.password,
			provider:'local',
			type: requestBody.type,
			verified: false,
			isActive:false,
			firstName: requestBody?.firstName,
			lastName: requestBody?.lastName,
			businessName: requestBody?.businessName,
		};

		const { user: User, email, code } = await createAccount(data);

		if (!User) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: "UNEXPECTED_ERROR",
				message: "Error occurred: Unexpected error occurred",
				type: "error",
			});
		}

		sendMail(
			mailOptions({
				to: email,
				subject: "Email Verification",
				html: `<h1>${code}</h1>`,
			}),
			(err, info) => {
				// network err will be logged to a file/database
			}
		);
		
		
		return res.status(STATUS.CREATED).json({
			code: "REGISTRATION_SUCCESS",
			message: "Account has been successfully created. A mail has already been sent to your email address with instructions to verify your account.",
			type: "success",
			data: User,
		});
	} catch (error) {
		const err = error as Error;

		next(err);
	}
};
