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
): Promise<BUSINESS | null> => {
	const user = await Database.business.findUnique({
		where: {
			id,
		},
		include: {
			stores: {
				include: {
					products: {
						include: {
							images: true,
						},
					},
					categories: true,
					template: {
						include: {
							storeTeams: true,
							storeReasons: true,
							temp: {
								include: {
									tempTeams: true,
									tempReasons: true,
								},
							},
						},
					},
				},
			},
		},
	});

	return user;
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

export const findStoreById = async (id: string): Promise<STORE | null> => {
	const store = await Database.store.findUnique({
		where: {
			id,
		},
		include: {
			products: {
				include: {
					images: true,
				},
			},
			categories: true,
			orders: true,
			template: true,
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
