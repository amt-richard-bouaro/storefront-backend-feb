import { z } from 'zod';
const methods = ['Card', 'Paypal'] as const;
const NEW_WALLET = z.object({
	method: z.enum(methods),
	walletId: z.string().nonempty('walletId is required'),
	name: z.string().nonempty('name is required'),
	secret: z.string().default('not required'),
});

type NEW_WALLET = z.infer<typeof NEW_WALLET>;

export { NEW_WALLET };
