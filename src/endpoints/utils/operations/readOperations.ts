import { Database } from '../../../database/dbClient';
import { USER } from '../../../services/generalTypes';

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

export const findAccountById = async (id: string): Promise<USER> => {
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
export const findAccountByProviderId = async (id: string) => {
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
};

export const findBusinessById = async (id: string) => {
	const user = await Database.business.findUnique({
		where: {
			id,
		},
		include: {
			template: {
				select: {
					business: false,
					banner: true,
					id: true,
					temp: true,
				},
			},
			products: true,
			categories: true,
		},
	});

	return user;
};
