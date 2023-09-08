import passport from "passport";
import passportLocal from "passport-local";
import {
	findAccountByEmail,
	findAccountById,
	passwordValidator,
} from "../endpoints/utils/reusableFunctions";

import { Request, Response } from "express";
import { SERVER_CONFIG, STATUS } from "../config/main";
import { userSerialization } from "./generalTypes";

const localStrategy = passportLocal.Strategy;

passport.use(
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (username, password, done) => {
			const user = await findAccountByEmail(username);

			if (!user) {
				return done(null, false, {
					message: "Incorrect username or password",
				});
			}

			const validPassword = await passwordValidator(password, user.password);

			if (!validPassword) {
				return done(null, false, {
					message: "Incorrect username or password",
				});
			}

			return done(null, user);
		}
	)
);

export const authenticate =  (strategy: string, req: Request, res: Response) => {
	passport.authenticate(strategy, (err, user, info) => {
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

			// return res.status(STATUS.UNAUTHORIZED).json({
			// 	code: "UNAUTHORIZED",
			// 	message: "Invalid credentials",
			// 	type: "error",
			// });
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

		
	})(req, res);
};




