export const CART_MSG = {
	EMPTY: {
		CODE: 'CART_IS_EMPTY',
		MESSAGE:
			'Your cart is empty. Please add some products to your cart before proceeding to checkout.',
	},
	INSUFFICIENT_STOCK: {
		CODE: 'INSUFFICIENT_STOCK',
		MESSAGE:
			'There is not enough stock available for the selected product. Please reduce the quantity or choose a different product.',
	},
	NOT_FOUND: {
		CODE: 'CART_NOT_FOUND',
		MESSAGE: 'Cart could not found. Make sure that the cart ID is correct',
	},
	ITEM_NOT_ADDED: {
		CODE: 'CART_ITEM_NOT_ADDED',
		MESSAGE: 'Failed to add item to cart.',
	},
	ITEM_NOT_UPDATED: {
		CODE: 'CART_ITEM_NOT_UPDATED',
		MESSAGE: 'Failed to update item in cart.',
	},
	ITEM_NOT_REMOVED: {
		CODE: 'CART_ITEM_NOT_REMOVED',
		MESSAGE: 'Failed to remove items from cart.',
	},
};
