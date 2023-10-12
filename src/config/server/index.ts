import { z } from 'zod';

const SERVER_CONFIG_SCHEMA = z.object({
	PORT: z.number().default(4455),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	SALT_VALUE: z.number().default(10),
	JWT_SECRET: z.string().trim().min(1),
	SESSION_SECRET: z.string().trim().min(1),
	CLIENT_ORIGIN: z.string().url(),
	ORIGIN: z.string().url(),
	ALLOWED_ORIGINS: z.array(z.string().url()),
	EMAIL_ADDRESS: z.string().email().trim(),
	EMAIL_PASSWORD: z.string().trim(),
	EMAIL_SERVICE: z.string().trim(),
	EMAIL_HOST: z.string().trim().min(1),
	EMAIL_PORT: z.number().default(435),
	REDIS_URL: z.string().url(),
});

const serverConfig = SERVER_CONFIG_SCHEMA.safeParse({
	PORT: parseInt(process.env.PORT!),
	NODE_ENV: process.env.NODE_ENV,
	SALT_VALUE: parseInt(process.env.SALT_VALUE!),
	JWT_SECRET: process.env.JWT_SECRET!,
	SESSION_SECRET: process.env.SESSION_SECRET!,
	CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!,
	ORIGIN: process.env.ORIGIN!,
	ALLOWED_ORIGINS: [process.env.CLIENT_ORIGIN!, process.env.ORIGIN!],
	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS!,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!,
	EMAIL_SERVICE: process.env.EMAIL_SERVICE!,
	EMAIL_HOST: process.env.EMAIL_HOST!,
	EMAIL_PORT: parseInt(process.env.EMAIL_PORT!),
	REDIS_URL: process.env.REDIS_URL!,
});

if (!serverConfig.success) {
	console.log(serverConfig.error.issues);

	throw new Error(`Invalid server config: ${serverConfig.error}`);
}

const SERVER_CONFIG = serverConfig.data;

export default SERVER_CONFIG;
