export const PRODUCT = {
	BASE_ROUTE: '/api/product',

	ADD_PRODUCT: '/add/:store_id',
	DELETE_PRODUCTS: '/delete',
	DELETE_PRODUCT_IMAGES: '/delete-images',
	UPDATE_PRODUCT: '/update-product/:product_id',
	UPDATE_PRODUCTS_DISCOUNT: '/update-products-discount',

	REVIEW_PRODUCT: '/review-product/:order_id',
	GET_PRODUCT_REVIEWS: '/get-product-reviews/:product_id',
	GET_STORE_PRODUCTS: '/get-all-products/:store_id',
	GET_PRODUCT: '/:product_id',
};
