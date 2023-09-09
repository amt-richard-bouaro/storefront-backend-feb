import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "../../../services/generalTypes";
import { STATUS } from "../../../config/main";

export const handleLogout = async (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {
	try {

		if (!req.isAuthenticated()) {
			return res.status(STATUS.BAD_REQUEST).json({
				code: "LOGGED_OUT_FAILED",
				message: "User not logged in",
				type: "error",
			});
		}
		req.logout(err => {
			if (err) {
				throw new Error(err);
			}
		});

		req.session.cookie.maxAge = 0;

		res.status(STATUS.OK).json({
			code: "LOGGED_OUT",
			message: "Logout successfully",
			type: "success",
		});
	} catch (error) {
		const err = error as Error;
		next(err);
	}
};
