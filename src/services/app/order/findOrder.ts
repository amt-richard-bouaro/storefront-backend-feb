import { Database } from '../../../extensions/dbClient';
import { ORDER } from '../../../interfaces/types';

export const findOrderById = async (
	id: string,
	includes?: { items?: boolean }
): Promise<ORDER | null> => {
	const order = await Database.order.findFirst({
		where: {
			OR: [{ id }],
			AND: { NOT: { status: 'Cancelled' } },
		},
		include: {
			items: includes?.items === true,
		},
	});

	return order;
};
