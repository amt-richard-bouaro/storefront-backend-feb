import { Database } from '../../../extensions/dbClient';
import { ORDER } from '../../../interfaces/types';

export const findAllOrders = async (
	id: string,
	includes?: { items?: boolean }
): Promise<ORDER[] | null> => {
	const order = await Database.order.findMany({
		where: {
			OR: [{ store: id }, { customer: id }],
		},
		include: {
			items: includes?.items === true,
		},
	});

	return order;
};
