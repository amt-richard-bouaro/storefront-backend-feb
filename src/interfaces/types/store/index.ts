import { BUSINESS } from '../business';
import { CUSTOMER, SAVED_ITEM } from '../customer';
import { ORDER, PAYOUT } from '../order';
import { CATEGORY, PRODUCT } from '../product';
import { REPLY } from '../review';

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
	visitors?: VISITOR[];
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

export type VISITOR = {
	id: string;
	liked: boolean;
	identity: string;
	store: string;
	storeVisitor: STORE;
	customer: string;
	customrVisit: CUSTOMER;
	createdAt: Date;
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
