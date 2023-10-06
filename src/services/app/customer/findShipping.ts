import { Database } from '../../../extensions/dbClient';
import { SHIPPING } from '../../../interfaces/types';

export const findShippingInfo = async (
	id: string
): Promise<SHIPPING | null> => {
	const shipping = await Database.shipping.findFirst({
		where: {
			id,
		},
	});

	return shipping;
};
