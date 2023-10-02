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
	providerId: string;
	verified: boolean;
	isActive: boolean;
	password: string;
	verificationToken: string | null;
	mustChangePassword: boolean;
	canResetPassword: boolean;
	createdAt: Date;
	updatedAt: Date;
	customer: CUSTOMER | null;
	business: BUSINESS | null;
};

export interface REQUEST_WITH_USER {
	id: string;
	providerId: string;
	customer: string | undefined;
	business: string | undefined;
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
	template: string | null;
	storeTeams?: TEMPLATE;
	temp: string;
	storeTeamsTemp?: TEMP;
};
export type REASON = {
	id: string;
	title: string;
	paragraph: string;
	template: string | null;
	temp: string;
	storeReasons?: TEMPLATE;
	storeReasonsTemp?: TEMP;
};
// export type TEMPLATE = {
// 	id: string;
// 	name: string;
// 	brandImage: string;
// 	brandColor: string;
// 	welcomeColor: string;
// 	welcomebtnText: string;
// 	welcomeText: string;
// 	fontstyle: string;
// 	primaryColor: string;
// 	secondaryColor: string;
// 	auxillaryColor: string;
// 	storeStory: string;
// 	storeTeams?: TEAM[];
// 	storeReasons?: REASON[];
// 	hasContactPage: boolean;
// 	hasAboutPage: boolean;
// 	store: string;
// 	temp?: TEMP | null;
// };

export type TEMPLATE = {
	id: string;
	options: string;
	store: string;
	temp?: TEMP | null;
};

// export type TEMP = {
// 	id: string;
// 	name: string;
// 	brandImage?: string;
// 	brandColor?: string;
// 	welcomeColor?: string;
// 	welcomebtnText?: string;
// 	welcomeText?: string;
// 	fontstyle?: string;
// 	primaryColor?: string;
// 	secondaryColor?: string;
// 	auxillaryColor?: string;
// 	storeStory?: string;
// 	tempTeams?: TEAM[];
// 	tempReasons?: REASON[];
// 	hasContactPage: boolean;
// 	hasAboutPage: boolean;
// 	template: string;
// 	tempTemplate?: TEMPLATE | null;
// };

export type TEMP = {
	id: string;
	options: string;
	template: string;
	tempTemplate?: TEMPLATE | null;
};

export type VARIATION = {
	id: string;
	type: string;
	value: string;
	product: string;
	productVariations?: PRODUCT;
	orders?: ORDER_ITEM[];
};
export type CATEGORY = {
	id: string;
	name: string;
	store: string;
	storeCategories?: STORE;
};
export type IMAGE = {
	id: string;
	url: string;
	key: string;
	product: string;
	productImage?: PRODUCT;
};
export type REVIEW = {
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

export type REPLY = {
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
export type ORDER_ITEM = {
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
export type SAVED_ITEM = {
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
	customerSaves?: SAVED_ITEM[];
	createdAt: Date;
	updatedAt: Date;
	store: string;
	storeProducts?: STORE;
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

export type SHIPPING = {
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

export type PAYOUT = {
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

export type BUSINESS_ADDRESS = {
	id: string;
	country: string;
	streetAddress: string;
	appartmentNo: string;
	city: string;
	phone: string;
	business: string;
	businessAddress: BUSINESS;
};

export type CUSTOMER = {
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

export type BUSINESS = {
	id: string;
	businessName: string;
	businessType: string | null;
	stores?: STORE[];
	addresses?: BUSINESS_ADDRESS[];
	businessAccount?: USER[];
};
