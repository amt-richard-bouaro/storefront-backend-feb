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
				callbackURL: '/api/account/google/business/callback',
			},
			async function (accessToken: unknown, refreshToken: unknown, user, done) {
				try {
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
							'There is already a user registered with this account. if you own this account, please login with your email and password',
					});
				} catch (error) {
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user ' +
							error.message,
					});
				}
			}
		)
	);

	passport.use(
		'google-customer',
		new GoogleStrategy(
			{
				clientID: GOOGLE_API.CLIENT_ID,
				clientSecret: GOOGLE_API.CLIENT_SECRET,
				callbackURL: '/api/account/google/customer/callback',
			},
			async function (accessToken, refreshToken, user, done) {
				try {
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
							'There is already a user registered with this account. if you own this account, please login with your email and password',
					});
				} catch (error) {
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user: ' +
							error.message,
					});
				}
			}
		)
	);

	passport.use(
		'google-auth',
		new GoogleStrategy(
			{
				clientID: GOOGLE_API.CLIENT_ID,
				clientSecret: GOOGLE_API.CLIENT_SECRET,
				callbackURL: '/api/account/google/auth/callback',
			},
			async function (accessToken, refreshToken, user, done) {
				try {
					const data: NEW_ACCOUNT = {
						email: user.email,
						provider: 'google',
					};

					const userExist = await findAccountByEmail(data.email);

					if (!userExist) {
						return done(null, false, {
							message:
								'There is no account associated with this google account. You might want to create a new account instead.',
						});
					}

					if (userExist && userExist.provider === 'google') {
						return done(null, user);
					}
				} catch (error) {
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user ' +
							error.message,
					});
				}
			}
		)
	);
};

export default GoogleSignOption;
