import { Database } from '../../../extensions/dbClient';

export const deleteProductImage = async (
	ids: string[]
): Promise<{ count: number } | null> => {
	const deleteCount = await Database.image.deleteMany({
		where: {
			id: {
				in: ids,
			},
		},
	});

	return deleteCount;
};
