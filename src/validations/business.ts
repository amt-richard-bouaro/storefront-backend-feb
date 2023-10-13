import { z } from 'zod';

const BUSINESS_TYPE = z.object({
	businessType: z
		.string()
		.nonempty(
			'We would like to know the kind of business you operate. Please select a business type.'
		),
});

type BUSINESS_TYPE = z.infer<typeof BUSINESS_TYPE>;

const NEW_STORE = z.object({
	storeType: z
		.string()
		.nonempty(
			'Tell us the kind of store you want us to create for your business.'
		),
	businessID: z.string().optional(),
	storeName: z.string().nonempty('Please specify the name of this store.'),
	template: z
		.object({
			options: z.string(),
		})
		.optional(),
});

type NEW_STORE = z.infer<typeof NEW_STORE>;

const NEW_CATEGORY = z.object({
	names: z
		.array(z.string().nonempty('Please provide category name'))
		.nonempty('Please provide category name'),
});
type NEW_CATEGORY = z.infer<typeof NEW_CATEGORY>;

const DELETE_CATEGORIES = z.object({
	categories: z
		.array(z.string().nonempty('Please provide category id'))
		.nonempty('Please provide at least one category id to delete'),
});

type DELETE_CATEGORIES = z.infer<typeof DELETE_CATEGORIES>;

const TEMPLATE = z.object({
	options: z.string(),
});

type TEMPLATE = z.infer<typeof TEMPLATE>;

const TEAM_MEMBER = z.object({
	name: z.string().nonempty("Please provide team member's name"),
	role: z.string().nonempty("Please provide team member's role"),
});

type TEAM_MEMBER = z.infer<typeof TEAM_MEMBER>;

export {
	BUSINESS_TYPE,
	TEMPLATE,
	NEW_STORE,
	TEAM_MEMBER,
	NEW_CATEGORY,
	DELETE_CATEGORIES,
};
