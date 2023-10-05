import { BUSINESS } from '../business';
import { CUSTOMER } from '../customer';

type USER = {
	id: string;
	email: string;
	type: 'Business' | 'Customer'|'Admin';
	provider: 'local' | 'google' | 'facebook';
	providerId: string;
	verified: boolean;
	isActive: boolean;
	password: string;
	verificationToken: string | null;
	mustChangePassword: boolean;
	canResetPassword: boolean;
	createdAt: Date;
	updatedAt: Date;
	customer: CUSTOMER | null;
	business: BUSINESS | null;
};

const ACCOUNT_TYPES = ['Customer', 'Business'] as const;

type ACCOUNTS = 'Customer' | 'Business' | 'Admin';

type CHECKS =
	| 'verified'
	| 'isActive'
	| 'mustChangePassword'
	| 'canResetPassword';

	
export { USER, CHECKS, ACCOUNTS, ACCOUNT_TYPES };
