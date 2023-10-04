import { Database } from '../../../extensions/dbClient';
import { CUSTOMER } from '../../../interfaces/types';

export const findCustomerById = async (
	id: string
): Promise<CUSTOMER | null> => {
	const user = await Database.customer.findFirst({
		where: {
			OR: [{ id }, { account: id }],
		},
		include: {
			reviews: true,
			Replies: true,
			orders: true,
			shipping: true,
		},
	});

	return user;
};
