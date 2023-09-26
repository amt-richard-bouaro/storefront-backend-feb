import { z } from 'zod';

const NEW_PRODUCT = z.object({
	name: z
		.string()
		.min(2, 'Product name must not be less than 2 characters')
		.nonempty('Please provide a product name'),
	price: z.number().nonnegative('Product price must not be less than 0.00'),
	quantity: z
		.number()
		.refine((val) => val < 1, 'Product quantity must not be less than 1'),
	description: z.string().nonempty('Product description must not be empty'),
	isActive: z.boolean(),
	category: z.string().nonempty('Product category must not be empty'),
	variations: z
		.object({
			type: z.string().nonempty('Variation type must not be empty'),
			value: z.string().nonempty('Variation value must not be empty'),
		})
		.array()
		.optional(),
});

type NEW_PRODUCT = z.infer<typeof NEW_PRODUCT>;

const PRODUCTS_TO_DELETE = z.object({
	products: z.string().array().nonempty('Products to delete must not be empty'),
});
type PRODUCTS_TO_DELETE = z.infer<typeof PRODUCTS_TO_DELETE>;

const IMAGES_TO_DELETE = z.object({
	images: z.string().array().nonempty('Images to delete must not be empty'),
});
type IMAGES_TO_DELETE = z.infer<typeof IMAGES_TO_DELETE>;

const REMARKS = ['Disappointing', 'Great', 'Satisfied'] as const;

const REVIEW_PRODUCT = z.object({
	rating: z
		.number()
		.min(1, 'Rating ranges from 1 to 5')
		.max(5, 'Rating ranges from 1 to 5'),

	comment: z.string().optional(),
	remarks: z.enum(REMARKS),
});

type REVIEW_PRODUCT = z.infer<typeof REVIEW_PRODUCT>;

export { NEW_PRODUCT, PRODUCTS_TO_DELETE, IMAGES_TO_DELETE, REVIEW_PRODUCT };
