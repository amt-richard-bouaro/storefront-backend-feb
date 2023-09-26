import passport from 'passport';
import facebookStrategy from 'passport-facebook';
import { FACEBOOK_API } from '../config/index';
import { NEW_ACCOUNT } from '../endpoints/account/types';
import { findAccountByEmail } from '../endpoints/utils/operations/readOperations';
import { createAccount } from '../endpoints/utils/operations/writeOperations';

const FacebookStrategy = facebookStrategy.Strategy;

type FACEBOOK_USER = {
	id: string;
	name: { givenName: string; familyName: string };
	emails: { value: string }[];
};
const FacebookSignInOption = () => {
	passport.use(
		'facebook-business',
		new FacebookStrategy(
			{
				clientID: FACEBOOK_API.CLIENT_ID,
				clientSecret: FACEBOOK_API.CLIENT_SECRET,
				callbackURL: '/api/account/facebook/business/callback',
				profileFields: ['id', 'name', 'email'],
			},
			async function (accessToken: unknown, refreshToken: unknown, User, done) {
				try {
					const user = User as FACEBOOK_USER;
					const data: NEW_ACCOUNT = {
						email: user.emails[0].value,
						password: user.id,
						confirmPassword: '',
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
				} catch (error) {
					const err = error as Error;
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user ' +
							err.message,
					});
				}
			}
		)
	);

	passport.use(
		'facebook-customer',
		new FacebookStrategy(
			{
				clientID: FACEBOOK_API.CLIENT_ID,
				clientSecret: FACEBOOK_API.CLIENT_SECRET,
				callbackURL: '/api/account/facebook/customer/callback',
				profileFields: ['id', 'name', 'email'],
			},
			async function (accessToken: unknown, refreshToken: unknown, User, done) {
				try {
					const user = User as FACEBOOK_USER;
					const data: NEW_ACCOUNT = {
						email: user.emails[0].value,
						password: user.id,
						confirmPassword: user.id,
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
				} catch (error) {
					const err = error as Error;
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user ' +
							err.message,
					});
				}
			}
		)
	);

	passport.use(
		'facebook-auth',
		new FacebookStrategy(
			{
				clientID: FACEBOOK_API.CLIENT_ID,
				clientSecret: FACEBOOK_API.CLIENT_SECRET,
				callbackURL: '/api/account/facebook/auth/callback',
				profileFields: ['id', 'name', 'email'],
			},
			async function (accessToken: unknown, refreshToken: unknown, User, done) {
				try {
					const user = User as FACEBOOK_USER;
					const data: { email: string; provider: 'facebook' } = {
						email: user.emails[0].value,
						provider: 'facebook',
					};

					const userExist = await findAccountByEmail(data.email);

					if (!userExist) {
						return done(null, false, {
							message:
								'There is no account associated with this facebook account. You might want to create a new account instead.',
						});
					}

					if (userExist && userExist.provider === 'facebook') {
						return done(null, user);
					}
				} catch (error) {
					const err = error as Error;
					return done(null, false, {
						message:
							'Something went wrong while trying to authenticate user ' +
							err.message,
					});
				}
			}
		)
	);
};

export default FacebookSignInOption;
