import passport from 'passport';
import passportLocal from 'passport-local';
import { findAccountByEmail } from '../endpoints/utils/operations/readOperations';
import { passwordValidator } from '../endpoints/utils/helperFunctions';
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
				const user = await findAccountByEmail(username);

				if (!user) {
					return done(null, false, {
						message: 'Incorrect email or password',
					});
				}
				const validPassword = await passwordValidator(password, user.password);

				if (!validPassword) {
					return done(null, false, {
						message: 'Incorrect email or password',
					});
				}
				return done(null, {
					id: user.id,
					email: user.email,
					type: user.type,
					provider: user.provider,
					providerId: user.providerId,
					verified: user.verified,
					isActive: user.isActive,
					mustChangePassword: user.mustChangePassword,
					canResetPassword: user.canResetPassword,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					customer: user.customer,
					business: user.business,
				});
			}
		)
	);
};

export default LocalSignInOption;
