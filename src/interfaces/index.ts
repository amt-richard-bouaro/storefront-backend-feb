interface RESPONSE {
	code: string;
	message: string;
	type: 'error' | 'success';
	stack?: any;
	data?: any;
	error?: any;
}

interface MAIL_OPTIONS {
	from?: {
		name: string;
		address: string;
	};
	to: string;
	subject: string;
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

export { RESPONSE, MAIL_OPTIONS, REQUEST_WITH_USER, userSerialization };
