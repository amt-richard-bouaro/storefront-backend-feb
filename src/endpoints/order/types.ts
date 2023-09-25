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

export { ITEMS_TO_BUY, ITEMS_TO_BUY_TYPE, CHANGE_ORDER_ITEM_QUANTITY };
