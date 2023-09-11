import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth2';
import { GOOGLE_API } from '../config/main';
import { NEW_ACCOUNT } from '../endpoints/account/types';
import { findAccountByEmail } from '../endpoints/utils/operations/readOperations';
import { createAccount } from '../endpoints/utils/operations/writeOperations';

const GoogleStrategy = OAuth2Strategy.Strategy;

const GoogleSignOption = () => {
	passport.use(
		'google-business',
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
					provider: 'google',
					type: 'Business',
					verified: user.verified,
					isActive: true,
					providerId: user.id,
					businessName: user.name.familyName + ' Business',
				};

				const userExist = await findAccountByEmail(data.email);

				if (!userExist) {
					await createAccount(data);

					return done(null, user);
				}

				if (userExist && userExist.provider === 'google') {
					return done(null, user);
				}

				return done(null, false, {
					message:
						'There is already a user with registered with this account. if you own this account, please login with your email and password',
				});
			}
		)
	);

	passport.use(
		'google-customer',
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
					provider: 'google',
					type: 'Customer',
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

				if (userExist && userExist.provider === 'google') {
					return done(null, user);
				}

				return done(null, false, {
					message:
						'There is already a user with registered with this account. if you own this account, please login with your email and password',
				});
			}
		)
	);
};

export default GoogleSignOption;
