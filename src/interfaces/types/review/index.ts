import { STORE } from '../store';
import { CUSTOMER } from '../customer';
import { PRODUCT } from '../product';
import { ORDER } from '../order';

type REVIEW = {
	id: string;
	product: string;
	productReview?: PRODUCT;
	rating: number;
	remarks: 'Disappointing' | 'Outstanding' | 'Satisfactory';
	comment: string | null;
	customer: string;
	customerReview?: CUSTOMER;
	order: string;
	orderReview?: ORDER;
	replies?: REPLY[];
	createdAt: Date;
	updatedAt: Date;
};

type REPLY = {
	id: string;
	comment: string;
	from: 'Business' | 'Customer' | 'Admin';
	customer: string | null;
	customerReply?: CUSTOMER;
	store: string | null;
	storeReply?: STORE;
	review: string;
	reviewReply?: REVIEW;
	createdAt: Date;
	updatedAt: Date;
};

export { REVIEW, REPLY };
