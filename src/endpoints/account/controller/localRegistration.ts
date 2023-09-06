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
import { authenticate } from "../../../services/passportStrategies";

export const localRegistration = async (
	req: Request<any, any, NEW_ACCOUNT>,
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

		const data = {
			name: requestBody.name,
			email: requestBody.email,
			password: requestBody.password,
			provider: requestBody.provider,
			type: requestBody.type,
			verified: requestBody.provider !== "local",
		};

		const User = await createAccount(data);

		if (!User) {
			return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
				code: "UNEXPECTED_ERROR",
				message: "Error occurred: Unexpected error occurred",
				type: "error",
			});
		}

		sendMail(
			mailOptions({
				to: User.email,
				subject: "Email Verification",
				html: `<h1>${User.verificationToken}</h1>`,
			})
		);

		authenticate("local", req, res);
	} catch (error) {
		const err = error as Error;

		next(err);
	}
};
