import { Request, Response, NextFunction } from "express";
import { REQUEST_WITH_USER, RESPONSE } from "../../../services/generalTypes";
import { STATUS } from "../../../config/main";
import { findAccountById } from "../../utils/reusableFunctions";

export const authenticatedUser = async (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	const requestUser = <REQUEST_WITH_USER>req.user;

	if (!req.isAuthenticated() || !requestUser.id) {
		return res.status(STATUS.UNAUTHORIZED).json({
			code: "UNAUTHORIZED",
			message: "Unauthorized: Could not authenticate user",
			type: "error",
		});
	}

	const user = await findAccountById(requestUser.id);

	if (!user) {
		return res.status(STATUS.UNAUTHORIZED).json({
			code: "UNAUTHORIZED",
			message: "Unauthorized: Could not find any user",
			type: "error",
		});
	}

	return res.status(STATUS.OK).json({
		code: "LOGGED_IN",
		message: "Success",
		type: "success",
		data: user,
	});
};
