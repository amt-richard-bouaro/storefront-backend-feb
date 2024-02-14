import { z } from 'zod';

const NEW_DESTINATION = z.object({
	destinations: z.array(
		z.object({
			name: z.string().nonempty('Please select a destination country'),
			code: z
				.string()
				.nonempty('Please select a destination country code missing'),
			duration: z
				.number()
				.min(1, 'Destination shipping duration should have at least 1 day'),
			cost: z.number().default(0),
			isActive: z.boolean().default(true),
		})
	),
});

type NEW_DESTINATION = z.infer<typeof NEW_DESTINATION>;

const UPDATE_DESTINATION = z.object({
	duration: z
		.number()
		.min(1, 'Destination shipping duration should have at least 1 day'),
	cost: z.number().default(0),
	isActive: z.boolean(),
});

type UPDATE_DESTINATION = z.infer<typeof UPDATE_DESTINATION>;

const PROMOTION = z
	.object({
		name: z.string().nonempty('Please provide a name for this promotion'),
		statement: z.string().default('Special offers and best deals'),
		discount: z
			.number()
			.min(0, 'Promotion discount must be greater than 0')
			.max(100, 'Promotion discount must not be greater than 100'),
		start: z.date(),
		end: z.date(),
	})
	.refine((promotion) => promotion.start < promotion.end, {
		message: `Promotion end date must be later than start date`,
		path: ['end'],
	});

type PROMOTION = z.infer<typeof PROMOTION>;

const REMOVE_PROMO_ITEM = z.object({
	products: z.string().array().nonempty('Products to remove must not be empty'),
});
type REMOVE_PROMO_ITEM = z.infer<typeof REMOVE_PROMO_ITEM>;

const DELETE_SITE_IMAGES = z.object({
	images: z
		.array(z.string().nonempty('Please provide image url'))
		.nonempty('Please provide at least one image url to delete'),
});

type DELETE_SITE_IMAGES = z.infer<typeof DELETE_SITE_IMAGES>;

const ADD_SITE_IMAGE = z.object({
	name: z.string().nonempty('Please provide image name'),
});

type ADD_SITE_IMAGE = z.infer<typeof ADD_SITE_IMAGE>;

export {
	NEW_DESTINATION,
	UPDATE_DESTINATION,
	PROMOTION,
	DELETE_SITE_IMAGES,
	REMOVE_PROMO_ITEM,
	ADD_SITE_IMAGE,
};
