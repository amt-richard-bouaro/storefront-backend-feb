import { STORE } from '../store';
import { CUSTOMER } from '../customer';
import { PRODUCT } from '../product';

type REVIEW = {
	id: string;
	product: string;
	productReview?: PRODUCT;
	rating: number;
	remarks: string;
	comment: string | null;
	customer: string;
	customerReview?: CUSTOMER;
	replies?: REPLY[];
	createdAt: Date;
	updatedAt: Date;
};

type REPLY = {
	id: string;
	comment?: string;
	from: 'Business' | 'Customer';
	customer: string;
	customerReply?: CUSTOMER;
	store: string;
	storeReply?: STORE;
	review: string;
	reviewReply?: REVIEW;
	createdAt: Date;
	updatedAt: Date;
};

export { REVIEW, REPLY };
