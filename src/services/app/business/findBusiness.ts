import { Database } from '../../../extensions/dbClient';
import { BUSINESS } from '../../../interfaces/types';

export const findBusinessById = async (
	id: string
	// includes?: { stores?: boolean }
): Promise<BUSINESS | null> => {
	const business = await Database.business.findFirst({
		where: {
			id,
		},
		include: {
			stores: {
				include: {
					template: {
						include: {
							temp: true,
						},
					},
				},
			},
		},
	});

	return business;
};
