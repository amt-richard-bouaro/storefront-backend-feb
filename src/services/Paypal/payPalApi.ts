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

export const createOrder = async (data: {
	cart?: { name: string; quantity: string; price: string }[];
	address: {
		countryCode: string;
		postalCode: string;
		streetAddress: string;
		appartmentNo: string;
		city: string;
		phone: string;
	};
	total: string;
}) => {
	console.log(data.cart);

	const accessToken = await generateAccessToken();

	const url = `${PAYPAL_API.BASE_URL}/v2/checkout/orders`;
	const payload = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: data.total,
				},
				shipping: {
					address: {
						address_line_1: data.address.streetAddress,
						address_line_2: data.address.appartmentNo,
						admin_area_2: data.address.appartmentNo,
						admin_area_1: data.address.city,
						postal_code: data.address.postalCode,
						country_code: data.address.countryCode,
					},
				},
			},
		],
		payment_source: {
			paypal: {
				experience_context: {
					payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
					brand_name: 'StoreFront',
					locale: 'en-US',
					landing_page: 'LOGIN',
					shipping_preference: 'SET_PROVIDED_ADDRESS',
					user_action: 'PAY_NOW',
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

	return handleResponse(response);
};

export const payoutStore = async (data: {
	amount: string;
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
					currency: 'USD',
					value: data.amount,
				},
				recipient_type: 'EMAIL',
				note: 'Thanks for your patronage!',
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
