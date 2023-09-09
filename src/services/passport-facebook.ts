import passport from "passport";
import facebookStrategy from "passport-facebook";
import { FACEBOOK_API } from "../config/main";
import {
	createAccount,
	findAccountByEmail,
} from "../endpoints/utils/reusableFunctions";

import { NEW_ACCOUNT } from "../endpoints/account/types";

const FacebookStrategy = facebookStrategy.Strategy;

passport.use(
	"facebook-business",
	new FacebookStrategy(
		{
			clientID: FACEBOOK_API.CLIENT_ID,
			clientSecret: FACEBOOK_API.CLIENT_SECRET,
			callbackURL: "/api/account/facebook/business/callback",
			profileFields: ["id", "name", "email"],
		},
		async function (accessToken: unknown, refreshToken: unknown, user, done) {
			const data: NEW_ACCOUNT = {
				email: user.emails[0].value,
				password: user.id,
				provider: "facebook",
				type: "Business",
				verified: true,
				isActive: true,
				providerId: user.id,
				businessName: user.name.familyName + " Business",
			};

			const userExist = await findAccountByEmail(data.email);

			if (!userExist) {
				await createAccount(data);

				return done(null, user);
			}

			if (userExist && userExist.provider === "facebook") {
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
	"facebook-customer",
	new FacebookStrategy(
		{
			clientID: FACEBOOK_API.CLIENT_ID,
			clientSecret: FACEBOOK_API.CLIENT_SECRET,
			callbackURL: "/api/account/facebook/customer/callback",
			profileFields: ["id", "name", "email"],
		},
		async function (accessToken: unknown, refreshToken: unknown, user, done) {
			const data: NEW_ACCOUNT = {
				email: user.emails[0].value,
				password: user.id,
				provider: "facebook",
				type: "Customer",
				verified: true,
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

			if (userExist && userExist.provider === "facebook") {
				return done(null, user);
			}

			return done(null, false, {
				message:
					"There is already a user with registered with this account. if you own this account, please login with your email and password",
			});
		}
	)
);
