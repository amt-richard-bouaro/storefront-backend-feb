export interface RESPONSE {
	code: string;
	message: string;
	type: 'error' | 'success';
	stack?: any;
	data?: any;
	error?: any;
}

export interface MAIL_OPTIONS {
	from?: {
		name: string;
		address: string;
	};
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export interface userSerialization {
	id: string;
	type: string;
	providerId: string;
	provider: string;
	verified: boolean;
	isActive: boolean;
	mustChangePassword: boolean;
}

export type USER = {
	id: string;
	email: string;
	type: 'Business' | 'Customer';
	provider: 'local' | 'google' | 'facebook';
	providerId: string;
	verified: boolean;
	isActive: boolean;
	mustChangePassword: boolean;
	canResetPassword: boolean;
	createdAt: Date;
	updatedAt: Date;
	customer: object | null;
	business: object | null;
};

export interface REQUEST_WITH_USER {
	id: string;
	providerId: string;
}

export const ACCOUNT_TYPES = ['Customer', 'Business'] as const;
export type ACCOUNTS = 'Customer' | 'Business';
