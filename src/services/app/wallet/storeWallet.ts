import { Database } from '../../../extensions/dbClient';
import { WALLET } from '../../../interfaces/types/wallet';

export const findWallets = async (
	cusOrStoreID: string
): Promise<WALLET[] | null> => {
	const wallets = await Database.wallet.findMany({
		where: {
			OR: [{ store: cusOrStoreID }, { customer: cusOrStoreID }],
		},
		select: {
			id: true,
			name: true,
			method: true,
			walletId: true,
			secret: false,
			createdAt: true,
			updatedAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return wallets;
};
export const findSingleWallet = async (
	cusOrStoreID: string,
	method: 'Paypal' | 'Card'
): Promise<WALLET | null> => {
	const wallet = await Database.wallet.findFirst({
		where: {
			OR: [{ store: cusOrStoreID }, { customer: cusOrStoreID }],
			AND: { method },
		},
		select: {
			id: true,
			name: true,
			method: true,
			walletId: true,
			secret: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return wallet;
};

export const createWallet = async (
	type: 'Store' | 'Customer',
	data: {
		method: 'Card' | 'Paypal';
		walletId: string;
		secret?: string;
		name: string;
		customer?: string;
		store?: string;
	}
): Promise<WALLET | null> => {
	if (type === 'Store' && !data.store) {
		return null;
	}

	if (type === 'Customer' && !data.customer) {
		return null;
	}

	const wallets = await Database.wallet.create({
		data: {
			...data,
			store: type === 'Store' && data.store ? data.store : null,
			customer: type === 'Customer' && data.customer ? data.customer : null,
		},
	});

	return wallets;
};
export const updateWallet = async (
	walletID: string,
	type: 'Store' | 'Customer',
	data: {
		method: 'Card' | 'Paypal';
		walletId: string;
		secret?: string;
		name: string;
		customer?: string;
		store?: string;
	}
): Promise<WALLET | null> => {
	if (type === 'Store' && !data.store) {
		return null;
	}

	if (type === 'Customer' && !data.customer) {
		return null;
	}

	const wallets = await Database.wallet.update({
		where: {
			id: walletID,
		},
		data: {
			...data,
		},
	});

	return wallets;
};
