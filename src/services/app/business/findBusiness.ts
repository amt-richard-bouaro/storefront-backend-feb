import { Database } from '../../../extensions/dbClient';
import { BUSINESS } from '../../../interfaces/types';

export const findBusinessById = async (
	id: string,
	includes?: { stores?: boolean; template?: boolean }
): Promise<BUSINESS | null> => {
	const business = await Database.business.findFirst({
		where: {
			id,
		},
		include: {
			stores: includes?.stores
				? {
						include: {
							template: includes.template
								? {
										include: {
											temp: true,
										},
								  }
								: false,
						},
						orderBy: { createdAt: 'desc' },
				  }
				: false,
		},
	});

	return business;
};
