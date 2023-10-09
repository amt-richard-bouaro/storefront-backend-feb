import { Database } from '../../../extensions/dbClient';

export const createStoreCategory = async (
	data: {
		name: string;
		store: string;
	}[]
): Promise<{ count: number } | null> => {
	const category = await Database.category.createMany({
		data,
	});

	return category;
};

export const deleteStoreCategory = async (
	data: string[]
): Promise<{ count: number } | null> => {
	const category = await Database.category.deleteMany({
		where: {
			id: {
				in: data,
			},
		},
	});

	return category;
};
