import { Serializer } from "v8";
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { GOOGLE_API } from "../config/main";
import {
	createAccount,
	findAccountByEmail,
	findAccountById,
	findAccountByProviderId,
} from "../endpoints/utils/reusableFunctions";

import { NEW_ACCOUNT } from "../endpoints/account/types";
import { userSerialization } from "./generalTypes";

const GoogleStrategy = OAuth2Strategy.Strategy;

const customSerializer = (user, done) => {
	const id = {
		providerId: user.id,
	};

	done(null, id);
};

passport.use(
	"google-business",
	new GoogleStrategy(
		{
			clientID: GOOGLE_API.CLIENT_ID,
			clientSecret: GOOGLE_API.CLIENT_SECRET,
			callbackURL: GOOGLE_API.CALLBACKURL_BUSINESS,
		},
		async function (accessToken, refreshToken, user, done) {
			const data: NEW_ACCOUNT = {
				email: user.email,
				password: user.id,
				provider: "google",
				type: "Business",
				verified: user.verified,
				isActive: true,
				providerId: user.id,
				businessName: user.name.familyName + " Business",
			};

			const userExist = await findAccountByEmail(data.email);

			if (!userExist) {
				await createAccount(data);

				return done(null, user);
			}

			if (userExist && userExist.provider === "google") {
				return done(null, user);
			}

			return done(null, false, {
				message:
					"There is already a user with registered with this account. if you own this account, please login with your email and password",
			});
		}
	)
);

passport.use(
	"google-customer",
	new GoogleStrategy(
		{
			clientID: GOOGLE_API.CLIENT_ID,
			clientSecret: GOOGLE_API.CLIENT_SECRET,
			callbackURL: GOOGLE_API.CALLBACKURL_CUSTPMER,
		},
		async function (accessToken, refreshToken, user, done) {
			const data: NEW_ACCOUNT = {
				email: user.email,
				password: user.id,
				provider: "google",
				type: "Customer",
				verified: user.verified,
				isActive: true,
				providerId: user.id,
				firstName: user.name.givenName,
				lastName: user.name.familyName,
			};

			const userExist = await findAccountByEmail(data.email);

			if (!userExist) {
				await createAccount(data);

				return done(null, user);
			}

			if (userExist && userExist.provider === "google") {
				return done(null, user);
			}

			return done(null, false, {
				message:
					"There is already a user with registered with this account. if you own this account, please login with your email and password",
			});
		}
	)
);

passport.serializeUser((user: userSerialization, callback) => {
	if (user.provider === "local") {
		return callback(null, {
			providerId: user.providerId,
		});
	}

	return callback(null, {
		providerId: user.id,
	});
});

passport.deserializeUser(async (user: userSerialization, callback) => {
	console.log("deserialize", user);

	const User = await findAccountByProviderId(user.providerId);

	if (!User) {
		let err = new Error();
		return callback(null, false);
	}

	return callback(null, {
		id: User.id,
		providerId: User.providerId,
	});
});