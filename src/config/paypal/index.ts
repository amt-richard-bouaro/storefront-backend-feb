import { z } from 'zod';

export const PAYPAL_API = {
	SECRET_KEY: process.env.PAYPAL_SECRET_KEY!,
	CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
	BASE_URL: process.env.PAYPAL_BASE_URL!,
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
