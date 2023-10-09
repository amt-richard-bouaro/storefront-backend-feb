import { z } from 'zod';

export const GOOGLE_API = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
};

const GOOGLE_API_SCHEMA = z.object({
	CLIENT_ID: z.string().nonempty('Google Client ID is required'),
	CLIENT_SECRET: z.string().nonempty('Google Client Secret is required'),
});

type GOOGLE_API_SCHEMA = z.infer<typeof GOOGLE_API_SCHEMA>;
export const validateGoogleApiConfig = (config: GOOGLE_API_SCHEMA) => {
	const result = GOOGLE_API_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid Google API config: ${result.error}`);
	}

	return config;
};
