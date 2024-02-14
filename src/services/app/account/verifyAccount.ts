import { Database } from '../../../extensions/dbClient';

export const verifyAccount = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			verified: true,
		},
		select: {
			id: true,
			email: true,
			type: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			mustChangePassword: true,
			canResetPassword: true,
			createdAt: true,
			updatedAt: true,
			password: false,
			customer: true,
			business: true,
		},
	});

	return user;
};
