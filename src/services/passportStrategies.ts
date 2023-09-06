import passport from "passport";
import passportLocal from "passport-local";
import {
	findAccountByEmail,
	findAccountById,
	passwordValidator,
} from "../endpoints/utils/reusableFunctions";

import { Request, Response } from "express";

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

export const authenticate = (strategy: string, req: Request, res: Response) => {
	passport.authenticate(strategy, (err, user, info) => {
		if (err) {
			return res.status(403).json({
				code: "USER_CREATED",
				message: "Could not authenticate the account",
				type: "success",
			});
		}

		if (!user) {
			req.logout(err => {
				if (err) {
					throw new Error(err);
				}
			});

			req.session.cookie.maxAge = 0;

			return res.status(403).json({
				code: "USER_CREATED",
				message: "Could not authenticate the account",
				type: "success",
			});
		}

		return req.logIn(user, err => {
			if (err) {
				return res.status(403).json({
					code: "USER_CREATED",
					message: "Could not authenticate the account",
					type: "success",
				});
			}

			return res.status(200).json({
				code: "USER_CREATED",
				message:
					"User created successfully. Please check your email and verify your account",
				type: "success",
				data: user,
			});
		});
	})(req, res);
};

interface user {
	id: string;
	type: string;
}

passport.serializeUser((user: user, callback) => {
	return callback(null, { id: user.id, type: user.type });
});

passport.deserializeUser(async (user: user, callback) => {
	const User = await findAccountById(user.id);

	if (!User) {
		let err = new Error();
		return callback(null, err);
	}

	return callback(null, User);
});
