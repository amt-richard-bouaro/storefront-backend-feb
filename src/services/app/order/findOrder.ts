import { Database } from '../../../extensions/dbClient';
import { ORDER } from '../../../interfaces/types';

type status =
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

export const findOrderById = async (
	id: string,
	includes?: {
		items?: boolean;
		customerOrder?: boolean;
		storeOrder?: boolean;
		products?: boolean;
	},
	statuses: status[] = [
		'Pending_Payment',
		'Delivered',
		'On_Hold',
		'Refunded',
		'Returned',
		'Cancelled',
		'Shipped',
		'Processing',
		'Completed',
		'Failed',
	]
): Promise<ORDER | null> => {
	const order = await Database.order.findFirst({
		where: {
			OR: [{ id }],
			AND: {
				status: {
					in: statuses,
				},
			},
		},
		include: {
			items: includes?.items === true,
			customerOrder: includes?.customerOrder === true,
			storeOrder: includes?.storeOrder
				? {
						include: {
							products: includes?.products === true,
						},
				  }
				: false,
		},
	});

	return order;
};
export const findCancelOrders = async (
	ids: string[],
	includes?: {
		items?: boolean;
		customerOrder?: boolean;
		storeOrder?: boolean;
		products?: boolean;
	},
	statuses: status[] = [
		'Refunded',
		'Returned',
		'Cancelled',
		'Shipped',
		'Processing',
		'Completed',
		'Failed',
	]
): Promise<ORDER[] | null> => {
	const order = await Database.order.findMany({
		where: {
			id: { in: ids },
			AND: {
				OR: [
					{
						status: {
							notIn: statuses,
						},
					},
					{
						paid: false,
					},
				],
			},
		},
	});

	return order;
};
