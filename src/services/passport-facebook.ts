import passport from 'passport';
import facebookStrategy from 'passport-facebook';
import { FACEBOOK_API } from '../config/main';
import { NEW_ACCOUNT } from '../endpoints/account/types';
import { findAccountByEmail } from '../endpoints/utils/operations/readOperations';
import { createAccount } from '../endpoints/utils/operations/writeOperations';

const FacebookStrategy = facebookStrategy.Strategy;

const FacebookSignInOption = () => {
	passport.use(
		'facebook-business',
		new FacebookStrategy(
			{
				clientID: FACEBOOK_API.CLIENT_ID,
				clientSecret: FACEBOOK_API.CLIENT_SECRET,
				callbackURL: FACEBOOK_API.CALLBACKURL_BUSINESS,
				profileFields: ['id', 'name', 'email'],
			},
			async function (accessToken: unknown, refreshToken: unknown, user, done) {
				const data: NEW_ACCOUNT = {
					email: user.emails[0].value,
					password: user.id,
					provider: 'facebook',
					type: 'Business',
					verified: true,
					isActive: true,
					providerId: user.id,
					businessName: user.name.familyName + ' Business',
				};

				const userExist = await findAccountByEmail(data.email);

				if (!userExist) {
					await createAccount(data);

					return done(null, user);
				}

				if (userExist && userExist.provider === 'facebook') {
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
		'facebook-customer',
		new FacebookStrategy(
			{
				clientID: FACEBOOK_API.CLIENT_ID,
				clientSecret: FACEBOOK_API.CLIENT_SECRET,
				callbackURL: FACEBOOK_API.CALLBACKURL_CUSTPMER,
				profileFields: ['id', 'name', 'email'],
			},
			async function (accessToken: unknown, refreshToken: unknown, user, done) {
				const data: NEW_ACCOUNT = {
					email: user.emails[0].value,
					password: user.id,
					provider: 'facebook',
					type: 'Customer',
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

				if (userExist && userExist.provider === 'facebook') {
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

export default FacebookSignInOption;
