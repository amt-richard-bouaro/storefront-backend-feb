export const SERVER_CONFIG = {
	PORT: parseInt(process.env.PORT!),
	NODE_ENV: process.env.NODE_ENV! ?? 'development',
	SALT_VALUE: parseInt(process.env.SALT_VALUE!),
	JWT_SECRET: process.env.JWT_SECRET!,
	SESSION_SECRET: process.env.SESSION_SECRET!,
	CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!,
	ORIGIN: process.env.ORIGIN!,
	ALLOWED_ORIGINS: [
		process.env.CLIENT_ORIGIN!,
		process.env.ORIGIN!,
		'http://localhost:5173',
	],
	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS!,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!,
	EMAIL_SERVICE: process.env.EMAIL_SERVICE!,
	EMAIL_HOST: process.env.EMAIL_HOST!,
	EMAIL_PORT: parseInt(process.env.EMAIL_PORT!),
	REDIS_URL: process.env.REDIS_URL!,
};

export const GOOGLE_API = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
};

export const S3_BUCKET = {
	REGION: process.env.AWS_BUCKET_REGION!,
	NAME: process.env.AWS_BUCKET_NAME!,
	ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID!,
	SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
};

export const FACEBOOK_API = {
	CLIENT_ID: process.env.FACEBOOK_CLIENT_ID!,
	CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET!,
};

export const PAYPAL_API = {
	SECRET_KEY: process.env.PAYPAL_SECRET_KEY!,
	CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
	BASE_URL: process.env.PAYPAL_BASE_URL!,
};

export const STATUS = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
	NO_CONTENT: 204,
};
