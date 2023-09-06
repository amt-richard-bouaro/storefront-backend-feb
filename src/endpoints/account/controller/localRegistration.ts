import { Request, Response, NextFunction } from "express";
import { NEW_ACCOUNT } from "../types";
import { RESPONSE } from "../../../services/generalTypes";
import { emailExit } from "../../utils/fetchUser";

export const localRegistration = async (
	req: Request<any, any, NEW_ACCOUNT>,
	res: Response<RESPONSE>,
	next: NextFunction
) => {

    const requestBody = req.body

    try {

        NEW_ACCOUNT.parse(requestBody);

        const userExist = await emailExit(requestBody.email);
        
        if (userExist) {
            return res.status(200).json({
					code: "USER_ALREADY_EXIST",
					message: "There is already a user with that email. If you are the owner of this email, you might want to login instead.",
					type: "error",
				});
        }

        
        
        return res.status(200).json({
				code: "success",
				message: "Success",
				type: "success",
				data: requestBody,
			});
   
	} catch (error) {
		const err = error as Error;

		next(err);
	}
};
