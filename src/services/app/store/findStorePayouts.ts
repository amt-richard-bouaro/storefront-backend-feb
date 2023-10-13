import { Database } from '../../../extensions/dbClient';

export const findStorePayouts = async (storeID: string) => {
	const payouts = await Database.payout.findMany({
		where: {
			store: storeID,
		},
		include: {
			orderPayout: {
				select: {
					orderId: true,
					amount: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return payouts;
};
