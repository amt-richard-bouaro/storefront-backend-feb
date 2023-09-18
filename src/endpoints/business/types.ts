import { z } from 'zod';

const ONBOARDING = z.object({
	businessType: z
		.string()
		.nonempty(
			'We would like to know the kind of business you operate. Please select a business type.'
		),
	websiteType: z
		.string()
		.nonempty(
			'Tell us the website you want us to connect to. Please select a website type.'
		),
});

type ONBOARDING = z.infer<typeof ONBOARDING>;

const TEMPLATE = z.object({
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
	storeTeams: z.string().array().optional(),
	storeReasons: z.string().array().optional(),
	hasContactPage: z.boolean(),
	hasAboutPage: z.boolean(),
});

type TEMPLATE = z.infer<typeof TEMPLATE>;

export { ONBOARDING, TEMPLATE };
