import { Database } from '../../../extensions/dbClient';

type statuses =
	| 'Pending_Payment'
	| 'Delivered'
	| 'On_Hold'
	| 'Refunded'
	| 'Returned'
	| 'Cancelled'
	| 'Shipped'
	| 'Processing'
	| 'Completed'
	| 'Failed';

export const setOrderStatus = async (orderID: string, status: statuses) => {
	const statusChange = await Database.order.updateMany({
		where: {
			id: orderID,
		},
		data: {
			status,
		},
	});

	return statusChange;
};
