import { z } from 'zod';

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
