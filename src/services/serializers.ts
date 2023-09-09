import passport from 'passport'
import { userSerialization } from './generalTypes';
import { findAccountByProviderId } from '../endpoints/utils/reusableFunctions';

passport.serializeUser((user: userSerialization, callback) => {
	if (user.provider === "local") {
		return callback(null, {
			providerId: user.providerId,
		});
	}

	return callback(null, {
		providerId: user.id,
	});
});

passport.deserializeUser(async (user: userSerialization, callback) => {
	console.log("deserialize", user);

	const User = await findAccountByProviderId(user.providerId);

	if (!User) {
		let err = new Error();
		return callback(null, false);
	}

	return callback(null, {
		id: User.id,
		providerId: User.providerId,
	});
});
