export const CUSTOMER = {
	BASE_ROUTE: '/api/customer',

	ADD_SHIPPING_ADDRESS: '/add-shipping-address/:customer_id',
	REVIEW_PRODUCT: '/review-product/:order_id',
	REPLY_REVIEW: '/review-reply/:order_id',

	GET_REVIEWS: '/get-reviews/:customer_id',
	GET_SHIPPING_ADDRESSES: '/add-shipping-address/:customer_id',
	GET_ORDERS: '/get-orders/:customer_id',
	GET_CUSTOMER: '/:customer_id',

	ADD_WALLET: '/add-wallet/:customer_id',
	GET_WALLETS: '/get-wallets/:customer_id',

	ADD_VIEW_PRODUCTS: '/add-to-views/:customer_id',
	ADD_FAVORITE_PRODUCTS: '/add-to-favorites/:customer_id',

	GET_FAVORITE_PRODUCTS: '/get-favorite-products/:customer_id',
};
