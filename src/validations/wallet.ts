import { z } from 'zod';
import { validateCreditCard } from '../helpers';
const methods = ['Card', 'Paypal'] as const;
const NEW_WALLET = z
	.object({
		method: z.enum(methods),
		walletId: z.string().nonempty('walletId is required'),
		name: z.string().nonempty('name is required'),
		secret: z
			.string()
			.min(3, 'Invalid CVV length')
			.max(3, 'Invalid CVV length')
			.optional(),
	})
	.refine(
		(val) => {
			if (val.method === 'Card' && !val.secret) {
				return false;
			}

			if (val.secret && !/[0-9]{3}/.test(val.secret)) {
				return false;
			}

			return true;
		},
		{
			message:
				'Card fail validation. Please check your card cvv validity and try again. E.g. 923',
			path: ['secret'],
		}
	)
	.refine(
		(val) => {
			if (val.method === 'Card' && !validateCreditCard(val.walletId)) {
				return false;
			}

			return true;
		},
		{
			message:
				'Card fail validation. Please check your card validity and try again.E.g 4111 1111 1111 1111',
			path: ['walletId'],
		}
	);

type NEW_WALLET = z.infer<typeof NEW_WALLET>;

export { NEW_WALLET };
