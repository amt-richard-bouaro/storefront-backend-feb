import passport from 'passport';
import passportLocal from 'passport-local';
import { findAccountByEmail } from '../app/account/findAccount';
import { passwordValidator } from '../../helpers';

const localStrategy = passportLocal.Strategy;

const LocalSignInOption = () => {
	passport.use(
		'local-auth',
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (username, password, done) => {
				try {
					const user = await findAccountByEmail(username);

					if (!user) {
						return done(null, false, {
							message: 'Email or password incorrect',
						});
					}
					const validPassword = await passwordValidator(
						password,
						user.password
					);

					if (!validPassword) {
						return done(null, false, {
							message: 'Email or password incorrect',
						});
					}
					return done(null, user);
				} catch (error) {
					return done(null, false, {
						message: 'Something went wrong while trying to authenticate user',
					});
				}
			}
		)
	);
};

export default LocalSignInOption;
