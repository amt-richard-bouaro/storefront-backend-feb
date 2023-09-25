import { z } from 'zod';

const SERVER_CONFIG_SCHEMA = z.object({
	PORT: z.number().min(3000).max(9000),
	NODE_ENV: z.string(),
	SALT_VALUE: z.number().min(10).max(20),
	JWT_SECRET: z.string(),
	SESSION_SECRET: z.string(),
	CLIENT_ORIGIN: z.string(),
	ORIGIN: z.string(),
	ALLOWED_ORIGINS: z.array(z.string()),
	EMAIL_ADDRESS: z.string().email(),
	EMAIL_PASSWORD: z.string(),
	EMAIL_SERVICE: z.string(),
	EMAIL_HOST: z.string(),
	EMAIL_PORT: z.number().min(1).max(1000),
	REDIS_URL: z.string(),
});

type SERVER_CONFIG_SCHEMA = z.infer<typeof SERVER_CONFIG_SCHEMA>;

export const validateServerConfig = (config: SERVER_CONFIG_SCHEMA) => {
	const result = SERVER_CONFIG_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid server config: ${result.error}`);
	}

	return config;
};

const GOOGLE_API_SCHEMA = z.object({
	CLIENT_ID: z.string().nonempty('Google Client ID is required'),
	CLIENT_SECRET: z.string().nonempty('Google Client Secret is required'),
	CALLBACKURL_CUSTOMER: z
		.string()
		.nonempty('Google Callback URL for Customer is required'),
	CALLBACKURL_BUSINESS: z
		.string()
		.nonempty('Google Callback URL for Business is required'),
	CALLBACKURL_AUTH: z
		.string()
		.nonempty('Google Callback URL for Auth is required'),
});

type GOOGLE_API_SCHEMA = z.infer<typeof GOOGLE_API_SCHEMA>;
export const validateGoogleApiConfig = (config: GOOGLE_API_SCHEMA) => {
	const result = GOOGLE_API_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid Google API config: ${result.error}`);
	}

	return config;
};

const S3_BUCKET_SCHEMA = z.object({
	REGION: z.string().optional(),
	NAME: z.string().optional(),
	ACCESS_KEY: z.string().optional(),
	SECRET_KEY: z.string().optional(),
});

type S3_BUCKET_SCHEMA = z.infer<typeof S3_BUCKET_SCHEMA>;
export const validateS3BucketConfig = (config: S3_BUCKET_SCHEMA) => {
	const result = S3_BUCKET_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid S3 bucket config: ${result.error}`);
	}

	return config;
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

const PAYPAL_API_SCHEMA = z.object({
	SECRET_KEY: z.string().nonempty('PayPal Secret Key is required'),
	CLIENT_ID: z.string().nonempty('PayPal Client ID is required'),
	BASE_URL: z.string().nonempty('PayPal Base URL is required'),
});

type PAYPAL_API_SCHEMA = z.infer<typeof PAYPAL_API_SCHEMA>;
export const validatePayPalApiConfig = (config: PAYPAL_API_SCHEMA) => {
	const result = PAYPAL_API_SCHEMA.safeParse(config);

	if (!result.success) {
		throw new Error(`Invalid PayPal API config: ${result.error}`);
	}

	return config;
};

export {
	SERVER_CONFIG_SCHEMA,
	GOOGLE_API_SCHEMA,
	S3_BUCKET_SCHEMA,
	FACEBOOK_API_SCHEMA,
	PAYPAL_API_SCHEMA,
};
