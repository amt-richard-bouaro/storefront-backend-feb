import { Database } from '../../../extensions/dbClient';
import { REPLY } from '../../../interfaces/types';

export const addReply = async (data: {
	comment: string;
	from: 'Customer' | 'Business';
	customer?: string;
	store?: string;
	review: string;
}): Promise<REPLY | null> => {
	const reply = await Database.reply.create({
		data: {
			comment: data.comment,
			from: data.from,
			customer: data.customer,
			store: data.store,
			review: data.review,
		},
	});

	return reply;
};
