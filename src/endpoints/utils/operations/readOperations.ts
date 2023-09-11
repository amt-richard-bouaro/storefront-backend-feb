import { Database } from '../../../database/dbClient';

export const findAccountByEmail = async (email: string) => {
	const user = await Database.account.findUnique({
		where: {
			email,
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

export const findAccountById = async (id: string) => {
	try {
		const user = await Database.account.findUnique({
			where: {
				id,
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
				createdAt: true,
				updatedAt: true,
				password: false,
				customer: true,
				business: true,
			},
		});
		return user;
	} catch (error) {
		return error;
	}
};
export const findAccountByProviderId = async (id: string) => {
	try {
		const user = await Database.account.findFirst({
			where: {
				providerId: id,
			},
			select: {
				id: true,
				email: false,
				type: false,
				provider: false,
				verified: false,
				providerId: true,
				verificationToken: false,
				isActive: false,
				mustChangePassword: false,
				createdAt: false,
				updatedAt: false,
				password: false,
				customer: false,
				business: false,
			},
		});
		return user;
	} catch (error) {
		return error;
	}
};
