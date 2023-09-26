import { z } from 'zod';

const ITEMS_TO_BUY = z.object({
	store: z.string().nonempty('Please specify the store you want to order from'),
	shipping: z
		.string()
		.nonempty(
			'Please specify the shipping information you want use for this order'
		),
	items: z
		.array(
			z.object({
				product: z.string().nonempty('Product ID is required'),
				quantity: z.number().min(1, 'Quantity must be at least 1'),
				variations: z.array(
					z.object({
						id: z.string(),
					})
				),
			})
		)
		.nonempty('Order must at least have one product.'),
});

type ITEMS_TO_BUY_TYPE = {
	store: string;
	shipping: string;
	items: {
		product: string;
		quantity: number;
		variations: { id: string }[];
	}[];
};

const CHANGE_ORDER_ITEM_QUANTITY = z.object({
	id: z.string().nonempty('Item ID is required'),
	quantity: z.number().min(1, 'Quantity must be at least 1'),
});

type CHANGE_ORDER_ITEM_QUANTITY = z.infer<typeof CHANGE_ORDER_ITEM_QUANTITY>;

const DELETE_ORDER_ITEM = z.object({
	items: z.string().array().nonempty('Order must at least have one product.'),
});

type DELETE_ORDER_ITEM = z.infer<typeof DELETE_ORDER_ITEM>;

const CANCEL_ORDERS = z.object({
	orders: z
		.string()
		.array()
		.nonempty('There must be at least on order ID in the array.'),
});

type CANCEL_ORDERS = z.infer<typeof CANCEL_ORDERS>;

export {
	ITEMS_TO_BUY,
	ITEMS_TO_BUY_TYPE,
	CHANGE_ORDER_ITEM_QUANTITY,
	DELETE_ORDER_ITEM,
	CANCEL_ORDERS,
};
