import { Database } from '../../../database/dbClient';
import {
	BUSINESS,
	CUSTOMER,
	ORDER,
	STORE,
	USER,
} from '../../../services/generalTypes';

export const findAccountByEmail = async (
	email: string
): Promise<USER | null> => {
	const user = await Database.account.findUnique({
		where: {
			email,
		},
		include: {
			customer: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
			business: {
				select: {
					id: true,
					businessName: true,
					businessType: true,
				},
			},
		},
	});

	return user;
};

export const findAccountById = async (id: string): Promise<USER | null> => {
	const user = await Database.account.findUnique({
		where: {
			id,
		},
		include: {
			customer: true,
			business: true,
		},
	});

	return user;
};
export const findAccountByProviderId = async (
	id: string
): Promise<USER | null> => {
	const user = await Database.account.findFirst({
		where: {
			providerId: id,
		},
		include: {
			customer: true,
			business: true,
		},
	});
	return user;
};

export const findBusinessById = async (
	id: string
	// includes?: { stores?: boolean }
): Promise<BUSINESS | null> => {
	const business = await Database.business.findFirst({
		where: {
			id,
		},
		include: {
			stores: {
				include: {
					template: {
						include: {
							temp: true,
						},
					},
				},
			},
		},
	});

	return business;
};
export const findCustomerById = async (
	id: string
): Promise<CUSTOMER | null> => {
	const user = await Database.customer.findFirst({
		where: {
			OR: [{ id }, { account: id }],
		},
		include: {
			reviews: true,
			Replies: true,
			orders: true,
			shipping: true,
		},
	});

	return user;
};

export const findStoreById = async (
	id: string,
	includes?: {
		products?: boolean;
		categories?: boolean;
		orders?: boolean;
		template?: boolean;
	}
): Promise<STORE | null> => {
	const store = await Database.store.findUnique({
		where: {
			id,
		},
		include: {
			products:
				includes?.products === true
					? {
							include: {
								images: {
									select: {
										url: true,
										key: false,
										id: true,
										product: false,
									},
								},
							},
					  }
					: false,
			categories: includes?.categories === true,
			orders: includes?.orders === true,
			template: includes?.template === true,
		},
	});

	return store;
};

export const findOrderById = async (
	id: string,
	includes?: { items?: boolean }
): Promise<ORDER | null> => {
	const order = await Database.order.findFirst({
		where: {
			OR: [{ id }, { store: id }],
			AND: { NOT: { status: 'Cancelled' } },
		},
		include: {
			items: includes?.items === true,
		},
	});

	return order;
};
