import { Database } from '../../../extensions/dbClient';

export const cancelManyOrders = async (orders: string[]) => {
	const cancelledOrders = await Database.order.updateMany({
		where: {
			id: {
				in: orders,
			},
		},
		data: {
			status: 'Cancelled',
		},
	});

	return cancelledOrders;
};
