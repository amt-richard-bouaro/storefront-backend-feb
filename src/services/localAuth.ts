import passport from "passport";
import { Request, Response } from "express";
import { SERVER_CONFIG, STATUS } from "../config/main";


export const authenticate = (strategy: string, req: Request, res: Response) => {
	passport.authenticate(
		strategy,
		(err: unknown, user: object, info: unknown) => {
			if (err) {
				return res.status(STATUS.UNAUTHORIZED).json({
					code: "AUTH_ERROR",
					message:
						"Authentication failed. Error occurred while trying to authenticate account",
					type: "error",
					stack: SERVER_CONFIG.NODE_ENV !== "production" && err,
				});
			}

			if (!user) {
				req.logout(err => {
					if (err) {
						throw new Error(err);
					}
				});

				req.session.cookie.maxAge = 0;
			}

			req.logIn(user, err => {
				if (err) {
					return res.status(STATUS.UNAUTHORIZED).json({
						code: "AUTH_ERROR",
						message: "Authentication attempt failed.",
						type: "error",
					});
				}
			});
		}
	)(req, res);
};
