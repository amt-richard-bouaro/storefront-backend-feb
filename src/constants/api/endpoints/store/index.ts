export const STORE = {
	BASE_ROUTE: '/api/store',

	ADD_SITE_IMAGE: '/add-site-image/:store_id',
	GET_SITE_IMAGE: '/get-site-images/:store_id',
	DELETE_SITE_IMAGE: '/delete-site-images/:store_id',

	ADD_PROMOTION: '/add-promotion/:store_id',
	REMOVE_PROMOTION_ITEM: '/remove-promotion-item/:promo_id',
	DELETE_PROMOTION: '/delete-promotion/:promo_id',
	UPDATE_PROMOTION: '/update-promotion/:promo_id',
	GET_PROMOTIONS: '/get-promotions/:store_id',
	GET_PROMOTION_PRODUCTS: '/get-promotion-products/:promo_id',

	ADD_WALLET: '/add-wallet/:store_id',
	GET_STORE_WALLETS: '/get-wallets/:store_id',
	GET_STORE_WALLET: '/get-wallet/:store_id',

	SAVE_TEMPLATE_DRAFT: '/save-template-draft/:store_id',
	PUBLISH_TEMPLATE: '/publish-template/:store_id',

	ADD_STORE_CATEGORY: '/add-category/:store_id',
	DELETE_STORE_CATEGORY: '/delete-store-category/:category_id',
	GET_STORE_CATEGORIES: '/get-categories/:store_id',

	GET_TEMPLATE_DRAFT: '/get-temp/:store_id',
	GET_PUBLISHED_TEMPLATE: '/get-published-template/:store_id',

	GET_STORE_ORDERS: '/get-all-orders/:store_id',
	GET_STORE: '/get-store/:store_id',
	GET_STORE_PRODUCTS: '/get-store-products/:store_id',
	GET_STORES: '/get-all',
	GET_STORE_CUSTOMERS: '/get-all-customers/:store_id',
	GET_STORE_CUSTOMER: '/:store_id/get-customer/:customer_id',

	GET_PAYOUTS: '/get-payouts/:store_id',

	GET_STORE_REVIEWS: '/get-reviews/:store_id',
	REPLY_REVIEW: '/reply-customer/:store_id',

	ADD_SHIPPING_DESTINATION: '/add-shipping-destination/:store_id',
	UPDATE_SHIPPING_DESTINATION: '/update-shipping-destination/:destination_id',
	DELETE_SHIPPING_DESTINATION: '/delete-shipping-destination/:destination_id',
};
