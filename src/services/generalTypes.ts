import { Decimal } from '@prisma/client/runtime/library';

export interface RESPONSE {
	code: string;
	message: string;
	type: 'error' | 'success';
	stack?: any;
	data?: any;
	error?: any;
}

export interface MAIL_OPTIONS {
	from?: {
		name: string;
		address: string;
	};
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export interface userSerialization {
	id: string;
	type: string;
	providerId: string;
	provider: string;
	verified: boolean;
	isActive: boolean;
	mustChangePassword: boolean;
}

export type USER = {
	id: string;
	email: string;
	type: 'Business' | 'Customer';
	provider: 'local' | 'google' | 'facebook';
	providerId?: string;
	verified?: boolean;
	isActive?: boolean;
	verificationToken?: string;
	mustChangePassword?: boolean;
	canResetPassword?: boolean;
	createdAt: Date;
	updatedAt: Date;
	customer?: {
		id: string;
	} | null;
	business?: {
		id: string;
	} | null;
};

export interface REQUEST_WITH_USER {
	id: string;
	providerId: string;
}

export const ACCOUNT_TYPES = ['Customer', 'Business'] as const;
export type ACCOUNTS = 'Customer' | 'Business';
export type CHECKS =
	| 'verified'
	| 'isActive'
	| 'mustChangePassword'
	| 'canResetPassword';

export type TEAM = {
	id: string;
	picture: string;
	key: string;
	name: string;
	role: string;
	template?: string;
	temp: string;
};
export type REASON = {
	id: string;
	title: string;
	paragraph: string;
	template: string;
	temp: string;
};
export type TEMPLATE = {
	id: string;
	name: string;
	brandImage: string;
	brandColor: string;
	welcomeColor: string;
	welcomebtnText: string;
	welcomeText: string;
	fontstyle: string;
	primaryColor: string;
	secondaryColor: string;
	auxillaryColor: string;
	storeStory: string;
	storeTeams?: TEAM[];
	storeReasons?: REASON[];
	hasContactPage: boolean;
	hasAboutPage: boolean;
	store: string;
	temp?: string;
};

export type VARIATION = {
	id: string;
	type: string;
	value: string;
	product: string;
};
export type CATEGORY = {
	id: string;
	name: string;
	store: string;
};
export type IMAGE = {
	id: string;
	url: string;
	key: string;
	product: string;
};
export type REVIEW = {
	id: string;
	product: string;
	rating: number;
	remarks: string;
	comment?: string;
	customer: string;
	replies?: REPLY[];
	createdAt: Date;
	updatedAt: Date;
};

export type REPLY = {
	id: string;
	comment?: string;
	customer: string;
	business: string;
	review: string;
	createdAt: Date;
	updatedAt: Date;
};

export const ORDER_STATUS = [
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

export type ORDER = {
	id: string;
	amount: Decimal;
	paid: boolean;
	paymentReference: string;
	accessCode: string;
	paymentAuthorizationUrl: string;
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
	customer: string;
	items?: ORDER_ITEM[];
	createdAt: Date;
	updatedAt: Date;
};
export type ORDER_ITEM = {
	id: string;
	quantity: number;
	price: Decimal;
	discount: number;
	product: string;
	order: string;
};
export type SAVED_ITEM = {
	id: string;
	product: string;
	customer: string;
	createdAt: Date;
};

export type PRODUCT = {
	id: string;
	name: string;
	images?: IMAGE[];
	description: string;
	isActive: boolean;
	quantity: number;
	reStockLevel: number;
	category: string;
	price: number;
	discount: number;
	promotionProduct: boolean;
	variations?: VARIATION[];
	reviews?: REVIEW[];
	customerSave?: SAVED_ITEM[];
	createdAt: Date;
	updatedAt: Date;
	store: string;
	orders?: ORDER_ITEM[];
};

export type STORE = {
	id: string;
	storeName: string;
	storeType: string;
	promotion: boolean;
	promotionDiscount: number;
	currency: string;
	products?: PRODUCT[];
	categories?: CATEGORY[];
	template: TEMPLATE;
	orders?: ORDER[];
	business: string;
	createdAt: Date;
	updatedAt: Date;
};
