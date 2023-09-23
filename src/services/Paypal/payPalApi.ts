import fetch from 'node-fetch';
import { PAYPAL_API } from '../../config/main';

export const generateAccessToken = async () => {
	try {
		if (!PAYPAL_API.CLIENT_ID || !PAYPAL_API.SECRET_KEY) {
			throw new Error('MISSING_API_CREDENTIALS');
		}

		const credentials = `${PAYPAL_API.CLIENT_ID}:${PAYPAL_API.SECRET_KEY}`;
		const base64Credentials = Buffer.from(credentials).toString('base64');

		const response = await fetch(`${PAYPAL_API.BASE_URL}/v1/oauth2/token`, {
			method: 'POST',
			body: 'grant_type=client_credentials',
			headers: {
				Authorization: `Basic ${base64Credentials} `,
			},
		});

		const data = await response.json();
		return data.access_token;
	} catch (error) {
		throw new Error('Failed to generate Access Token:', error);
	}
};

export const createOrder = async (cart) => {
	console.log(cart);

	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders`;
	const payload = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: '0.01',
				},
			},
		],
	};

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		method: 'POST',
		body: JSON.stringify(payload),
	});

	return handleResponse(response);
};

export const captureOrder = async (orderID: string) => {
	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders/${orderID}/capture`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return handleResponse(response);
};

async function handleResponse(response) {
	try {
		const json = await response.json();
		return {
			json,
			status: response.status,
		};
	} catch (err) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
}
