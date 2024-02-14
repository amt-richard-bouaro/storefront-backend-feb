import { Database } from '../../../extensions/dbClient';
import { TEMP, TEMPLATE } from '../../../interfaces/types';

export const publishStoreTemplate = async (
	tempalateID: string,
	options: string
): Promise<TEMPLATE | null> => {
	const publishedTemplate = await Database.template.update({
		where: {
			id: tempalateID,
		},
		data: {
			options,
		},
	});

	return publishedTemplate;
};

export const saveStoreTemp = async (
	tempID: string,
	options: string
): Promise<TEMP | null> => {
	const temp = await Database.temp.update({
		where: {
			id: tempID,
		},
		data: {
			options: options,
		},
	});

	return temp;
};
