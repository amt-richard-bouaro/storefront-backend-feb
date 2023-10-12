export const CUSTOMER = {
	BASE_ROUTE: '/api/customer',

	ADD_SHIPPING_ADDRESS: '/add-shipping-address/:customer_id',
	REVIEW_PRODUCT: '/review-product/:order_id',
	REPLY_REVIEW: '/reply-review/:review_id',

	GET_REVIEWS: '/get-reviews/:customer_id',
	GET_SHIPPING_ADDRESSES: '/get-shipping-addresses/:customer_id',
	GET_ORDERS: '/get-orders/:customer_id',
	GET_CUSTOMER: '/:customer_id',

	ADD_WALLET: '/add-wallet/:customer_id',
	GET_WALLETS: '/get-wallets/:customer_id',

	ADD_VIEW_PRODUCTS: '/add-to-views/:customer_id',
	ADD_FAVORITE_PRODUCTS: '/add-to-favorites/:customer_id',
	UNSET_FAVORITE_PRODUCT: '/remove/:product_id/from-favorite/:customer_id',

	GET_SAVED_PRODUCTS: '/get-saved-products/:customer_id',
};
