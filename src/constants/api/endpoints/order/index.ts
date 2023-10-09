export const ORDER = {
	BASE_ROUTE: '/api/order',
	INITIALIZE_ORDER: '/initialize/:customer_id',
	APPROVE_ORDER_PAYMENT: '/approve-payment/:order_id',
	UPDATE_ORDER_ITEM: '/update-item/:order_id',
	REMOVE_ORDER_ITEM: '/remove-item/:order_id',

	GET_ORDER: '/get-single-order/:order_id',
	GET_STORE_ORDERS: '/get-all-orders/:store_id',
	CANCEL_ORDERS: '/cancel-orders',
	CHANGE_ORDER_SHIPPING: '/change-order-shipping/:order_id',
};
