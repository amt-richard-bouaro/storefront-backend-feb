import { Database } from '../../../extensions/dbClient';
import { findAccountById } from './findAccount';

export const activateAccount = async (id: string) => {
	try {
		const user = await findAccountById(id);

		if (user && user.verified) {
			const updatedUser = await Database.account.update({
				where: {
					id,
					verified: true,
				},
				data: {
					isActive: true,
				},
				include: {
					business: true,
					customer: true,
				},
			});

			return updatedUser;
		}

		return user;
	} catch (error) {
		throw new Error('Prisma Error');
	}
};
