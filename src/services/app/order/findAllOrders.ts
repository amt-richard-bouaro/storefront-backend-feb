import { Database } from '../../../extensions/dbClient';

export const findAllOrders = async (
	id: string,
	includes?: {
		items?: boolean;
		disbursement?: boolean;
		store?: boolean;
		shipping?: boolean;
		customer?: boolean;
	}
) => {
	const order = await Database.order.findMany({
		where: {
			OR: [{ store: id }, { customer: id }],
		},
		select: {
			referenceId: false,
			disbursement: includes?.disbursement
				? {
						select: {
							commission: true,
							payoutId: true,
							amount: true,
						},
				  }
				: false,
			orderDestination: {
				select: {
					name: true,
					code: true,
					cost: true,
				},
			},
			storeOrder: includes?.store
				? {
						select: {
							storeName: true,
							businessStore: {
								select: {
									businessName: true,
								},
							},
						},
				  }
				: false,
			customerOrder: includes?.customer
				? {
						select: {
							firstName: true,
							lastName: true,
							phone: true,
							customerAccount: {
								select: {
									email: true,
								},
							},
						},
				  }
				: false,
			items: includes?.items === true,
			orderShipping: includes?.shipping === true,
			createdAt: true,
			updatedAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return order;
};
