import { Database } from '../../../extensions/dbClient';
import { PAYOUT } from '../../../interfaces/types';

export const savePayout = async (data: {
	commission: number;
	payoutId: string;
	amount: number;
	currency: string;
	wallet: string;
	order: string;
	store: string;
}): Promise<PAYOUT | null> => {
	const payout = await Database.payout.create({
		data,
	});

	return payout;
};
