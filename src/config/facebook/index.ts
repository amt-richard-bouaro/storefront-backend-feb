import { z } from 'zod';

export const FACEBOOK_API = {
	CLIENT_ID: process.env.FACEBOOK_CLIENT_ID!,
	CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET!,
};

const FACEBOOK_API_SCHEMA = z.object({
	CLIENT_ID: z.string().nonempty('Facebook Client ID is required'),
	CLIENT_SECRET: z.string().nonempty('Facebook Client Secret is required'),
});

type FACEBOOK_API_SCHEMA = z.infer<typeof FACEBOOK_API_SCHEMA>;
export const validateFacebookApiConfig = (config: FACEBOOK_API_SCHEMA) => {
	const result = FACEBOOK_API_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid Facebook API config: ${result.error}`);
	}

	return config;
};
