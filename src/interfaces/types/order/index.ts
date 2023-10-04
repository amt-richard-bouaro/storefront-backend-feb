import { CUSTOMER } from '../customer';
import { PRODUCT, VARIATION } from '../product';
import { STORE } from '../store';

const ORDER_STATUS = [
	'Pending_Payment',
	'Delivered',
	'On_Hold',
	'Refunded',
	'Returned',
	'Cancelled',
	'Out_For_Delivery',
	'Shipped',
	'Processing',
	'Completed',
	'Failed',
] as const;
type ORDER = {
	id: string;
	amount: number;
	paid: boolean;
	orderId: string;
	referenceId: string;
	status:
		| 'Pending_Payment'
		| 'Delivered'
		| 'On_Hold'
		| 'Refunded'
		| 'Returned'
		| 'Cancelled'
		| 'Out_For_Delivery'
		| 'Shipped'
		| 'Processing'
		| 'Completed'
		| 'Failed';
	store: string;
	storeOrder?: STORE;
	customer: string;
	customerOrder?: CUSTOMER;
	items?: ORDER_ITEM[];
	disbursement?: PAYOUT;
	shipping: string;
	orderShipping?: SHIPPING;
	createdAt: Date;
	updatedAt: Date;
};
type ORDER_ITEM = {
	id: string;
	quantity: number;
	price: number;
	discount: number;
	total: number;
	image: string;
	name: string;
	variations?: VARIATION[];
	product: string;
	productOrdered?: PRODUCT;
	order: string;
	OrderItem?: ORDER;
};

type SHIPPING = {
	id: string;
	countryCode: string;
	postalCode: string;
	name: string;
	streetAddress: string;
	apartmentNo: string | null;
	city: string;
	phone: string;
	orders?: ORDER[];
	isActive: boolean;
	customer: string;
	customerShipping?: CUSTOMER;
};
type PAYOUT = {
	id: string;
	commission: number;
	payoutId: string;
	batch?: string;
	order: string;
	orderPayout: ORDER;
	store: string;
	storePayout: STORE;
	createdAt: Date;
	updatedAt: Date;
};

export { ORDER_STATUS, PAYOUT, SHIPPING, ORDER, ORDER_ITEM };
