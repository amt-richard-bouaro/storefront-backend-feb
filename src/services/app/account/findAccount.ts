import { Database } from '../../../extensions/dbClient';
import { USER } from '../../../interfaces/types';

export const findAccountByEmail = async (
	email: string
): Promise<USER | null> => {
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

export const findAccountById = async (id: string): Promise<USER | null> => {
	const user = await Database.account.findUnique({
		where: {
			id,
		},
		include: {
			customer: true,
			business: true,
		},
	});

	return user;
};
export const findAccountByProviderId = async (
	id: string
): Promise<USER | null> => {
	const user = await Database.account.findFirst({
		where: {
			providerId: id,
		},
		include: {
			customer: true,
			business: true,
		},
	});
	return user;
};
