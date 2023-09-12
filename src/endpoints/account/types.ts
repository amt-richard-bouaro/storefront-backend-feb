import { z } from 'zod';

const ACOUNT_TYPES = ['Business', 'Customer'] as const;
const ACCOUNT_PROVIDERS = ['local', 'google', 'facebook'] as const;

const NEW_ACCOUNT = z
	.object({
		email: z.string().email('Please provide a valid email address'),
		password: z.string().refine((val) => {
			if (val.length < 10) return false;

			if (!/[A-Z]/.test(val)) return false;

			if (!/[a-z]/.test(val)) return false;

			if (!/[0-9]/.test(val)) return false;

			return true;
		}, 'Password must be at least 10 characters long, contain at least one number, have at least one lowercase letter, and have at least one uppercase letter.'),
		confirmPassword: z.string().nonempty('Please confirm your password'),
		type: z.enum(ACOUNT_TYPES),
		provider: z.enum(ACCOUNT_PROVIDERS).optional(),
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		businessName: z.string().optional(),
		verificationToken: z.string().optional(),
		providerId: z.string().optional(),
		verified: z.boolean().optional(),
		isActive: z.boolean().optional(),
	})
	.refine((val) => val.password === val.confirmPassword, {
		message: `Passwords don't match`,
		path: ['confirmPassword'],
	})
	.refine(
		(val) => {
			if (val.type === 'Customer') {
				return !!val.firstName && !!val.lastName;
			} else if (val.type === 'Business') {
				return !!val.businessName;
			}
			return true;
		},
		{
			message:
				'Business account type must have a businessName property while Customer account type must have firstName and lastName properties',
		}
	);

type NEW_ACCOUNT = z.infer<typeof NEW_ACCOUNT>;

const PASSWORDS = z
	.object({
		password: z.string().refine((val) => {
			if (val.length < 10) return false;

			if (!/[A-Z]/.test(val)) return false;

			if (!/[a-z]/.test(val)) return false;

			if (!/[0-9]/.test(val)) return false;

			return true;
		}, 'Password must be at least 10 characters long, contain at least one number, have at least one lowercase letter, and have at least one uppercase letter.'),
		confirmPassword: z.string().nonempty('Please confirm your password'),
	})
	.refine((val) => val.password === val.confirmPassword, {
		message: `Passwords don't match`,
		path: ['confirmPassword'],
	});

type PASSWORDS = z.infer<typeof PASSWORDS>;

const EMAIL = z
	.string()
	.email('Please enter your email address to proceed with your request');

type EMAIL = z.infer<typeof EMAIL>;

const CODE = z
	.string()
	.nonempty('Please enter the code that was sent to your email address')
	.min(6, 'Code must be at least 6 characters');

type CODE = z.infer<typeof CODE>;

export { NEW_ACCOUNT, PASSWORDS, EMAIL, CODE };
