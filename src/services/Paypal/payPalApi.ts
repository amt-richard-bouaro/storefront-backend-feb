import fetch, { Response } from 'node-fetch';
import { PAYPAL_API } from '../../config/index';

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
		const err = error as Error;
		throw new Error('Failed to generate Access Token:', err);
	}
};

export const createOrder = async (data: {
	cart?: { name: string; quantity: string; price: string }[];
	total: number;
	currency: string;
	reference: string;
	shipping: {
		address_line_1: string;
		address_line_2: string;
		admin_area_2: string;
		admin_area_1: string;
		postal_code: string;
		country_code: string;
	};
}) => {
	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders`;
	const payload = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				reference_id: data.reference,
				amount: {
					currency_code: data.currency,
					value: data.total,
				},
				shipping: {
					address: data.shipping,
				},
			},
		],
		payment_source: {
			paypal: {
				experience_context: {
					payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
					brand_name: 'StoreFront',
					locale: 'en-US',
					user_action: 'PAY_NOW',
					shipping_preference: 'SET_PROVIDED_ADDRESS',
				},
			},
		},
	};

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		method: 'POST',
		body: JSON.stringify(payload),
	});

	const res = await handleResponse(response);

	return res;
};

export const payoutStore = async (data: {
	amount: string;
	currency: string;
	receiver: string;
	orderId: string;
	reference: string;
}) => {
	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v1/payments/payouts`;

	const payload = {
		items: [
			{
				receiver: data.receiver,
				amount: {
					currency: data.currency,
					value: data.amount,
				},
				recipient_type: 'EMAIL',
				note: 'Thanks you for doing patronizing StoreFront!',
				sender_item_id: data.orderId,
				recipient_wallet: 'PayPal',
			},
		],
		sender_batch_header: {
			sender_batch_id: data.reference,
			email_subject: 'You have a payout!',
			email_message:
				'You have received a payout! Thanks for using our service!',
		},
	};

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(payload),
	});

	return handleResponse(response);
};

export const updateOrder = async (data: {
	orderID: string;
	amount: number;
	currency: string;
	referenceId: string;
}) => {
	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders/${data.orderID}`;

	const payload = [
		{
			op: 'replace',
			path: `/purchase_units/@reference_id=='${data.referenceId}'/amount`,
			value: {
				currency_code: data.currency ?? 'USD',
				value: data.amount,
			},
		},
	];

	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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

export const getOrder = async (orderID: string) => {
	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders/${orderID}`;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return handleResponse(response);
};
async function handleResponse(response: Response) {
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
