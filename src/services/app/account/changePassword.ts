import { SERVER_CONFIG } from '../../../config';
import { Database } from '../../../extensions/dbClient';
import bcrypt from 'bcrypt';

export const changePassword = async (data: {
	id: string;
	password: string;
}) => {
	const salt = await bcrypt.genSalt(SERVER_CONFIG.SALT_VALUE);

	const hashedPassword = await bcrypt.hash(data.password, salt);

	const user = await Database.account.update({
		where: {
			id: data.id,
		},
		data: {
			password: hashedPassword,
			mustChangePassword: false,
			canResetPassword: false,
		},
	});

	return user;
};
