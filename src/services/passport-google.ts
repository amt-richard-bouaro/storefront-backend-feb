import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2";
import { GOOGLE_API } from "../config/main";
import { findAccountById } from "../endpoints/utils/reusableFunctions";
import { userSerialization } from "./generalTypes";

const GoogleStrategy = OAuth2Strategy.Strategy;

passport.use(
	"google-business",
	new GoogleStrategy(
		{
			clientID: GOOGLE_API.CLIENT_ID,
			clientSecret: GOOGLE_API.CLIENT_SECRET,
			callbackURL: GOOGLE_API.CALLBACKURL_BUSINESS,
		},
		function (accessToken, refreshToken, profile, done) {
			console.log("Business:", profile);

			done(null, profile);
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
		function (accessToken, refreshToken, profile, done) {
			console.log("Individual:", profile);

			done(null, profile);
		}
	)
);

passport.serializeUser((user: userSerialization, callback) => {
	return callback(null, {
		id: user.id,
	});
});

passport.deserializeUser(async (user: userSerialization, callback) => {
	const User = await findAccountById(user.id);

	if (!User) {
		let err = new Error();
		return callback(null, err);
	}

	return callback(null, {
		id: user.id,
		type: user.type,
		verified: user.verified,
		isActive: user.isActive,
		mustChangePassword: user.mustChangePassword,
	});
});
