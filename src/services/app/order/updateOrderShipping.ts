import { Database } from '../../../extensions/dbClient';

export const updateOrderShipping = async (id: string, shipping: string) => {
	const OrderShipping = await Database.order.update({
		where: {
			id,
		},
		data: {
			shipping: shipping,
		},
		include: {
			orderShipping: true,
		},
	});

	return OrderShipping;
};
