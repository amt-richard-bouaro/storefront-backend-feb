import { z } from 'zod';

const FACEBOOK_API_SCHEMA = z.object({
	CLIENT_ID: z.string().trim().nonempty('Facebook Client ID is required'),
	CLIENT_SECRET: z
		.string()
		.trim()
		.nonempty('Facebook Client Secret is required'),
});

export const faceBookApiConfig = FACEBOOK_API_SCHEMA.safeParse({
	CLIENT_ID: process.env.FACEBOOK_CLIENT_ID!,
	CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET!,
});

if (!faceBookApiConfig.success) {
	throw new Error(`Invalid facebook api config: ${faceBookApiConfig.error}`);
}

const FACEBOOK_API = faceBookApiConfig.data;

export default FACEBOOK_API;
