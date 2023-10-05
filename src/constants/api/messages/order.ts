export const ORDER_MSG = {
	NOT_FOUND: {
		CODE: 'ORDER_NOT_FOUND',
		MESSAGE: 'Order could not found. Make sure that the order ID is correct',
	},
	ALREADY_FULFILLED: {
		CODE: 'ORDER_ALREADY_FULFILLED',
		MESSAGE: 'Order has already been fulfilled.',
	},
	NOT_FULFILLED: {
		CODE: 'ORDER_NOT_FULFILLED',
		MESSAGE: 'Failed to fulfill order.',
	},
	ALREADY_CANCELLED: {
		CODE: 'ORDER_ALREADY_CANCELLED',
		MESSAGE: 'Order has already been cancelled.',
	},
	NOT_CANCELLED: {
		CODE: 'ORDER_NOT_CANCELLED',
		MESSAGE: 'Failed to cancel order.',
	},
	ALREADY_RETURNED: {
		CODE: 'ORDER_ALREADY_RETURNED',
		MESSAGE: 'Order has already been returned.',
	},
	NOT_RETURNED: {
		CODE: 'ORDER_NOT_RETURNED',
		MESSAGE: 'Failed to return order.',
	},
	INVALID_PAYMENT_METHOD: {
		CODE: 'INVALID_PAYMENT_METHOD',
		MESSAGE:
			'The selected payment method is invalid. Please select a different payment method.',
	},
	PAYMENT_FAILED: {
		CODE: 'PAYMENT_FAILED',
		MESSAGE: 'Your payment failed. Please try again later.',
	},
	PLACED_SUCCESSFULLY: {
		CODE: 'ORDER_PLACED_SUCCESSFULLY',
		MESSAGE:
			'Your order has been placed successfully. Thank you for shopping with us!',
	},
	CANCELLED_SUCCESSFULLY: {
		CODE: 'ORDER_CANCELLED_SUCCESSFULLY',
		MESSAGE: 'Your order has been cancelled successfully.',
	},
	RETURNED_SUCCESSFULLY: {
		CODE: 'ORDER_RETURNED_SUCCESSFULLY',
		MESSAGE: 'Your order has been returned successfully.',
	},
	ORDERS_FOUND: {
		CODE: 'ORDERS_FOUND',
		MESSAGE: 'Orders found.',
	},
};
