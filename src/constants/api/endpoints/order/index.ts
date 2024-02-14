export const ORDER = {
	BASE_ROUTE: '/api/order',
	INITIALIZE_ORDER: '/initialize/:customer_id',
	APPROVE_ORDER_PAYMENT: '/approve-payment/:orderID',
	UPDATE_ORDER_ITEM: '/update-item-quantity/:order_id',
	REMOVE_ORDER_ITEMS: '/remove-items/:order_id',
	SET_ORDER_AS_DELIVERED: '/delivered/:order_id',
	SET_ORDER_AS_SHIIPED: '/shipped/:order_id',

	GET_ORDER: '/get-single-order/:order_id',
	CANCEL_ORDERS: '/cancel-orders',
	CHANGE_ORDER_SHIPPING: '/change-order-shipping/:order_id',
};
