import { USER } from '../account';
import { ORDER, SHIPPING } from '../order';
import { PRODUCT } from '../product';
import { REPLY, REVIEW } from '../review';
import { STORE, VISITOR } from '../store';

type CUSTOMER = {
	id: string;
	firstName: string;
	lastName: string;
	phone?: string | null;
	reviews?: REVIEW[];
	replies?: REPLY[];
	orders?: ORDER[];
	savedProducts?: SAVED_ITEM[];
	visitedStores?: VISITOR[];
	shipping?: SHIPPING[];
	account?: string;
	customerAccount?: USER;
};

type SAVED_ITEM = {
	id: string;
	product: string;
	liked: boolean;
	savedProduct?: PRODUCT;
	customer: string;
	customrSavedProduct?: CUSTOMER;
	store: string;
	storerSavedProduct?: STORE;
	createdAt: Date;
};

export { SAVED_ITEM, CUSTOMER };
