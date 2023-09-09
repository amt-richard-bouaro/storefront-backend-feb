import passport from "passport";
import passportLocal from "passport-local";
import {
	findAccountByEmail,
	passwordValidator,
} from "../endpoints/utils/reusableFunctions";



const localStrategy = passportLocal.Strategy;

const LocalSignInOption = () => {
	passport.use(
		"local",
		new localStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			async (username, password, done) => {
				const user = await findAccountByEmail(username);
				if (!user) {
					return done(null, false, {
						message: "Incorrect username or password",
					});
				}
				const validPassword = await passwordValidator(
					password,
					user.password
				);
				if (!validPassword) {
					return done(null, false, {
						message: "Incorrect username or password",
					});
				}
				return done(null, user);
			}
		)
	);
}


export default LocalSignInOption;


