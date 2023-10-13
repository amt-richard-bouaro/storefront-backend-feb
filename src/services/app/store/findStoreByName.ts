import { Database } from '../../../extensions/dbClient';
import { STORE } from '../../../interfaces/types';

export const findStoreByName = async (name: string): Promise<STORE | null> => {
	const store = await Database.store.findFirst({
		where: {
			storeName: name,
		},
	});

	return store;
};
