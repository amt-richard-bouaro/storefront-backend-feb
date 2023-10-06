import { Database } from '../../../extensions/dbClient';
import { SHIPPING_DESTINATION } from '../../../interfaces/types/order';

export const findShippingDestination = async (
	id: string,
	includes?: { orders?: boolean; shippingDestinations?: boolean }
): Promise<SHIPPING_DESTINATION | null> => {
	const destination = await Database.shippingDestination.findFirst({
		where: {
			id,
		},
		include: {
			orders: includes?.orders === true,
			shippingDestinations: includes?.shippingDestinations === true,
		},
	});

	return destination;
};
