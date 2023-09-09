import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "../../../services/generalTypes";
import { STATUS } from "../../../config/main";

import passport from "passport";



export const handleLoginLocal = (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {

	console.log(req.body);
	
	passport.authenticate("local-auth", (err, user, info) => {
		if (err) {
			throw err;
		}

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({
				code: "UNAUTHORIZED",
				message: "Authentication failed! Please try again",
				type: "error",
			});
		} else {
			req.logIn(user, err => {
				if (err) {
					throw err;
				}

				return res.status(STATUS.OK).json({
					code: "LOGIN_SUCCESS",
					message: "Login successful",
					type: "error",
					data: user,
				});
			});
		}
	})(res, req, next);
};
