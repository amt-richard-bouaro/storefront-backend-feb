import { Database } from '../../../extensions/dbClient';
import { SHIPPING } from '../../../interfaces/types';

export const addShippingInfo = async (
	id: string,
	shippingInfo: {
		countryCode: string;
		postalCode: string;
		apartmentNo: string;
		phone: string;
		name: string;
		streetAddress: string;
		city: string;
		isActive: boolean;
	}
): Promise<SHIPPING | null> => {
	const shipping = await Database.shipping.create({
		data: {
			customer: id,
			...shippingInfo,
		},
	});

	return shipping;
};
