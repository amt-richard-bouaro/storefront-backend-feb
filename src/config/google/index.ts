import { z } from 'zod';

const GOOGLE_API_SCHEMA = z.object({
	CLIENT_ID: z.string().nonempty('Google Client ID is required'),
	CLIENT_SECRET: z.string().nonempty('Google Client Secret is required'),
});

const googleApiConfig = GOOGLE_API_SCHEMA.safeParse({
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
});

if (!googleApiConfig.success) {
	throw new Error(`Invalid google api config: ${googleApiConfig.error}`);
}

const GOOGLE_API = googleApiConfig.data;

export default GOOGLE_API;
