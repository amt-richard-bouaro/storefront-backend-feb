import { CUSTOMER } from '../customer';
import { STORE } from '../store';

export type WALLET = {
	id: string;
	name: string;
	walletId: string;
	method: 'Card' | 'Paypal';
	secret?: string;
	store?: string | null;
	storeWallet?: STORE;
	customer?: string | null;
	customerWallet?: CUSTOMER;
	createdAt: Date;
	updatedAt: Date;
};
