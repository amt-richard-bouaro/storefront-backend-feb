import { BUSINESS } from '../business';
import { SAVED_ITEM } from '../customer';
import { ORDER, PAYOUT } from '../order';
import { CATEGORY, PRODUCT } from '../product';
import { REPLY } from '../review';
import { WALLET } from '../wallet';

export type STORE = {
	id: string;
	storeName: string;
	storeType: string;
	promotions?: PROMOTION[];
	currency: string;
	products?: PRODUCT[];
	categories?: CATEGORY[];
	template?: TEMPLATE | null;
	orders?: ORDER[];
	wallets?: WALLET[];
	savedProducts?: SAVED_ITEM[];
	payments?: PAYOUT[];
	Replies?: REPLY[];
	business: string;
	businessStore?: BUSINESS;
	createdAt: Date;
	updatedAt: Date;
};

export type PROMOTION = {
	id: string;
	name: string;
	statement: string;
	discount: number;
	start: Date;
	end: Date;
	store: string;
	storePromotion?: STORE;
	products?: PRODUCT;
	createdAt: Date;
	updatedAt: Date;
};

export type TEMPLATE = {
	id: string;
	options: string;
	store: string;
	temp?: TEMP | null;
};

export type TEMP = {
	id: string;
	options: string;
	template: string;
	tempTemplate?: TEMPLATE | null;
};
