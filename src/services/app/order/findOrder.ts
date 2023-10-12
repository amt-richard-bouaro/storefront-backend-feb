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
		reviews?: boolean;
		orderShipping?: boolean;
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
			OR: [{ id }, { orderId: id }],
			AND: {
				status: {
					in: statuses,
				},
			},
		},
		include: {
			items: includes?.items === true,
			customerOrder: includes?.customerOrder
				? {
						include: {
							customerAccount: {
								select: {
									email: true,
								},
							},
						},
				  }
				: false,
			storeOrder: includes?.storeOrder
				? {
						include: {
							products: includes?.products === true,
						},
				  }
				: false,
			reviews: includes?.reviews === true,
			orderShipping: includes?.orderShipping === true,
		},
	});

	return order;
};
export const findNonCancellableOrders = async (
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
		orderBy: {
			updatedAt: 'desc',
		},
	});

	return order;
};
