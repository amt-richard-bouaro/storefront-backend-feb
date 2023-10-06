interface RESPONSE {
	code: string;
	message: string;
	type: 'error' | 'success';
	stack?: any;
	data?: any;
	error?: any;
}

type EMAIL_SUBJECT =
	| 'Email Verification'
	| 'Reset Password Confirmation'
	| 'Password Reset'
	| 'Reset Password Request'
	| 'Email Verified';
interface MAIL_OPTIONS {
	from?: {
		name: string;
		address: string;
	};
	to: string;
	subject: EMAIL_SUBJECT;
	text?: string;
	html?: string;
}

interface userSerialization {
	id: string;
	type: string;
	providerId: string;
	provider: string;
	verified: boolean;
	isActive: boolean;
	mustChangePassword: boolean;
}

interface REQUEST_WITH_USER {
	id: string;
	providerId: string;
	customer: string | undefined;
	business: string | undefined;
}

interface DESTINATION {
	id: string;
	name: string;
	code: string;
	duration: number;
	cost: number;
}

interface CURRENCY {
	id: string;
	name: string;
	code: string;
}

export {
	RESPONSE,
	MAIL_OPTIONS,
	REQUEST_WITH_USER,
	userSerialization,
	DESTINATION,
	CURRENCY,
};
