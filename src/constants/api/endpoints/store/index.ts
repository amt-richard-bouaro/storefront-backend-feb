export const STORE = {
	BASE_ROUTE: '/api/store',

	ADD_SITE_IMAGE: '/add-site-image/:store_id',

	SAVE_TEMPLATE_DRAFT: '/save-template-draft/:store_id',
	PUBLISH_TEMPLATE: '/publish-template/:store_id',

	ADD_STORE_CATEGORY: '/add-category/:store_id',
	DELETE_STORE_CATEGORY: '/delete-store-category/:category_id',

	GET_TEMPLATE_DRAFT: '/get-temp/:store_id',
	GET_PUBLISHED_TEMPLATE: '/get-published-template/:store_id',

	GET_STORE_ORDERS: '/get-all-order/:store_id',
	GET_STORE: '/:store_id',
};
