import { z } from 'zod';

const ITEMS_TO_BUY = z.object({
	items: z
		.array(
			z.object({
				product: z.string().nonempty('Product ID is required'),
				quantity: z.number().min(1, 'Quantity must be at least 1'),
			})
		)
		.nonempty(),
});

type ITEMS_TO_BUY_TYPE = {
	items: {
		product: string;
		quantity: number;
	}[];
};

export { ITEMS_TO_BUY, ITEMS_TO_BUY_TYPE };
