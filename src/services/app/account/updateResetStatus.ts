import { SERVER_CONFIG } from '../../../config';
import { Database } from '../../../extensions/dbClient';
import bcrypt from 'bcrypt';

export const updateResetStatus = async (email: string, token: string) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const password = await bcrypt.hash(token, salt);

	const user = await Database.account.update({
		where: {
			email,
		},
		data: {
			verificationToken: token,
			mustChangePassword: true,
			canResetPassword: false,
			password,
		},
	});

	return user;
};
