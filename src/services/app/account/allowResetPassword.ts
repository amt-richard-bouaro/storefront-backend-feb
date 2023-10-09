import { Database } from '../../../extensions/dbClient';

export const allowResetPassword = async (id: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			isActive: false,
			canResetPassword: true,
		},
		select: {
			id: true,
			email: true,
			type: true,
			provider: true,
			verified: true,
			verificationToken: true,
			isActive: true,
			providerId: true,
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
