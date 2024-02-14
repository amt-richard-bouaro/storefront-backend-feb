import { Database } from '../../../extensions/dbClient';
import { DESTINATION } from '../../../interfaces';
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
			// orders: includes?.orders === true,
			shippingDestinations: includes?.shippingDestinations === true,
		},
	});

	return destination;
};

export const findDestinationByCode = async (
	code: string
): Promise<DESTINATION | null> => {
	const destination = await Database.destination.findFirst({
		where: {
			code,
		},
	});

	return destination;
};
