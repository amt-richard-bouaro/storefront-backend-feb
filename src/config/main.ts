export const SERVER_CONFIG = {
	PORT: process.env.PORT && parseInt(process.env.PORT),
	NODE_ENV: process.env.NODE_ENV,
	SALT_VALUE: process.env.SALT_VALUE && parseInt(process.env.SALT_VALUE),
	JWT_SECRET: process.env.JWT_SECRET,
	SESSION_SECRET: process.env.SESSION_SECRET,
	CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
	ORIGIN: process.env.ORIGIN,
	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	

};

export const GOOGLE_API = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	CALLBACKURL_CUSTPMER: process.env.GOOGLE_CALLBACKURL_CUSTPMER,
	CALLBACKURL_BUSINESS: process.env.GOOGLE_CALLBACKURL_BUSINESS,
	CALLBACKURL_AUTH: process.env.GOOGLE_CALLBACKURL_AUTH,
};

export const S3_BUCKET = {
	REGION: process.env.AWS_BUCKET_REGION || null,
	NAME: process.env.AWS_BUCKET_NAME || null,
	ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID || null,
	SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY || null,
};

interface status {
	OK: number;
	CREATED: number;
	ACCEPTED: number;
	BAD_REQUEST: number;
	UNAUTHORIZED: number;
	FORBIDDEN: number;
	NOT_FOUND: number;
	CONFLICT: number;
	INTERNAL_SERVER_ERROR: number;
}

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
};
