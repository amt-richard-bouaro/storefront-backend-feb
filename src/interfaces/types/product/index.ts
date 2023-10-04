import { SAVED_ITEM } from '../customer';
import { ORDER_ITEM } from '../order';
import { REVIEW } from '../review';
import { STORE } from '../store';

type PRODUCT = {
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

type CATEGORY = {
	id: string;
	name: string;
	store: string;
	storeCategories?: STORE;
};

type IMAGE = {
	id: string;
	url: string;
	key: string;
	product: string;
	productImage?: PRODUCT;
};

type VARIATION = {
	id: string;
	type: string;
	value: string;
	product: string;
	productVariations?: PRODUCT;
	orders?: ORDER_ITEM[];
};


export {VARIATION, PRODUCT, CATEGORY, IMAGE,}