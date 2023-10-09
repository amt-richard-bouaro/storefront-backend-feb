import { Database } from '../../../extensions/dbClient';

export const findStoreTemplate = async (
	storeID: string,
	includes?: { temp?: boolean }
) => {
	const reviews = await Database.template.findFirst({
		where: {
			store: storeID,
		},
		include: {
			temp: includes?.temp === true,
		},
	});

	return reviews;
};
