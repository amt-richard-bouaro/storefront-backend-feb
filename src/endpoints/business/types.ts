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
			name: z.string(),
			brandImage: z.string(),
			brandColor: z.string(),
			welcomeColor: z.string(),
			welcomebtnText: z.string(),
			welcomeText: z.string(),
			fontstyle: z.string(),
			primaryColor: z.string(),
			secondaryColor: z.string(),
			auxillaryColor: z.string(),
			storeStory: z.string(),
			hasContactPage: z.boolean(),
			hasAboutPage: z.boolean(),
		})
		.optional(),
});

type NEW_STORE = z.infer<typeof NEW_STORE>;

const NEW_CATEGORY = z.object({
	name: z.string().nonempty('Please provide category name'),
});

type NEW_CATEGORY = z.infer<typeof NEW_CATEGORY>;

const TEMPLATE = z.object({
	name: z.string().optional(),
	brandImage: z.string(),
	brandColor: z.string(),
	welcomeColor: z.string(),
	welcomebtnText: z.string(),
	welcomeText: z.string(),
	fontstyle: z.string(),
	primaryColor: z.string(),
	secondaryColor: z.string(),
	auxillaryColor: z.string(),
	storeStory: z.string(),
	storeTeams: z.string().array().optional(),
	storeReasons: z.string().array().optional(),
	hasContactPage: z.boolean(),
	hasAboutPage: z.boolean(),
});

type TEMPLATE = z.infer<typeof TEMPLATE>;

const TEAM_MEMBER = z.object({
	name: z.string().nonempty("Please provide team member's name"),
	role: z.string().nonempty("Please provide team member's role"),
});

type TEAM_MEMBER = z.infer<typeof TEAM_MEMBER>;

const REASON = z.object({
	title: z.string().nonempty('Please provide a title for this reason'),
	paragraph: z.string().nonempty('Please provide brief note on the reason'),
});

type REASON = z.infer<typeof REASON>;

export {
	BUSINESS_TYPE,
	TEMPLATE,
	NEW_STORE,
	TEAM_MEMBER,
	REASON,
	NEW_CATEGORY,
};
