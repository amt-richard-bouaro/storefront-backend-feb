import { z } from 'zod';

const CUSTOMER_SHIPPING = z.object({
	countryCode: z.string().nonempty('countryCode is required'),
	postalCode: z.string().nonempty('postalCode is required'),
	apartmentNo: z.string().nonempty('apartmentNo is required'),
	phone: z.string().nonempty('phone is required'),
	name: z.string().nonempty('name is required'),
	streetAddress: z.string().nonempty('streetAddress is required'),
	city: z.string().nonempty('city is required'),
	isActive: z.boolean().default(true),
});

const VIEW_PRODUCTS = z.object({
	products: z.string().array(),
});

type VIEW_PRODUCTS = z.infer<typeof VIEW_PRODUCTS>;

export { CUSTOMER_SHIPPING, VIEW_PRODUCTS };
