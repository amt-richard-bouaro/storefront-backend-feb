import { Database } from '../../../extensions/dbClient';

export const updateVerificationCode = async (id: string, token: string) => {
	const user = await Database.account.update({
		where: {
			id,
		},
		data: {
			verificationToken: token,
		},
		include: {
			customer: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
			business: {
				select: {
					id: true,
					businessName: true,
					businessType: true,
				},
			},
		},
	});

	return user;
};
