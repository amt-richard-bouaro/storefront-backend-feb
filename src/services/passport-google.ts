import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { GOOGLE_API } from "../config/main";
import {
	createAccount,
	findAccountByEmail,
} from "../endpoints/utils/reusableFunctions";

import { NEW_ACCOUNT } from "../endpoints/account/types";

const GoogleStrategy = OAuth2Strategy.Strategy;

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
				businessName: user.name.familyName + " Business",
			};

			const userExist = await findAccountByEmail(data.email);

			if (userExist) {
				return done(null, user);
			}

			await createAccount(data);

			done(null, user);
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
					firstName: user.name.givenName,
					lastName: user.name.familyName,
				};

				const userExist = await findAccountByEmail(data.email);

				if (userExist) {
					return done(null, user);
				}

				await createAccount(data);

				done(null, user);
		}
	)
);
