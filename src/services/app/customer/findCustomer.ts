import { Database } from '../../../extensions/dbClient';
import { CUSTOMER } from '../../../interfaces/types';

export const findCustomerById = async (
	id: string,
	includes: {
		reviews?: boolean;
		replies?: boolean;
		orders?: boolean;
		shipping?: boolean;
	}
): Promise<CUSTOMER | null> => {
	const customer = await Database.customer.findFirst({
		where: {
			OR: [{ id }, { account: id }],
		},
		include: {
			reviews: includes.reviews
				? {
						include: {
							replies: includes.replies === true,
						},
						orderBy: {
							createdAt: 'desc',
						},
				  }
				: false,
			orders: includes.orders
				? {
						include: {
							orderShipping: true,
						},

						orderBy: {
							createdAt: 'desc',
						},
				  }
				: false,
			shipping: includes.shipping === true,
		},
	});

	return customer;
};
