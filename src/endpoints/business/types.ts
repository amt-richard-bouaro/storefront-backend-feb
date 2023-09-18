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
	banner: z.string().nonempty('Missing template banner'),
});

type TEMPLATE = z.infer<typeof TEMPLATE>;

export { ONBOARDING, TEMPLATE };
