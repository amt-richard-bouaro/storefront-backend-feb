import { Request, Response, NextFunction } from "express";
import { NEW_ACCOUNT } from "../types";
import { RESPONSE } from "../../../services/generalTypes";
import {
	findAccountByEmail,
	createAccount,
	sendMail,
	mailOptions,
	extractJwtPayload,
	findAccountById,
	verifyAccount
} from "../../utils/reusableFunctions";
import { STATUS } from "../../../config/main";
import { authenticate } from "../../../services/passportStrategies";

export const accountVerification = async (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	const token = req.params.token;

    try {
        
        const verificationToken = extractJwtPayload(token);

		const userExist = await findAccountByEmail(verificationToken.email);

		if (!userExist) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: "INVALID_REQUEST",
				message:
					"Could not verify the email address because the request contained invalid data.",
				type: "error",
			});
		}

        const user = await findAccountById(userExist.id);
        
        const userVerificationToken = extractJwtPayload(user.verificationToken);


		if (userVerificationToken.code !== verificationToken.code) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: "INVALID_REQUEST",
				message:
					"Could not verify the email address because the request contained invalid data.",
				type: "error",
			});
		}

		await verifyAccount(user.id)

		await sendMail(
			mailOptions({
				to: user.email,
				subject: "Email Verified",
				html: `<h1>Your email has been verified</h1>`,
            })
		);

        authenticate("local", req, res);
        

	} catch (error) {
		const err = error as Error;

		next(err);
	}
};
