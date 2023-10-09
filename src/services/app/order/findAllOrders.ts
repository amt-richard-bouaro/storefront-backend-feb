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
			orderDestination: {
				select: {
					name: true,
					code: true,
					cost: true,
				},
			},
			items: includes?.items === true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return order;
};
