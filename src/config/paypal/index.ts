import { z } from 'zod';

const PAYPAL_API_SCHEMA = z.object({
	SECRET_KEY: z.string().nonempty('PayPal Secret Key is required'),
	CLIENT_ID: z.string().trim().nonempty('PayPal Client ID is required'),
	BASE_URL: z.string().url().nonempty('PayPal Base URL is required'),
});

const paypalConfig = PAYPAL_API_SCHEMA.safeParse({
	SECRET_KEY: process.env.PAYPAL_SECRET_KEY!,
	CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
	BASE_URL: process.env.PAYPAL_BASE_URL!,
});

if (!paypalConfig.success) {
	console.log(paypalConfig.error.issues);
	throw new Error(`Invalid paypal config: ${paypalConfig.error}`);
}

const PAYPAL_API = paypalConfig.data;

export default PAYPAL_API;
