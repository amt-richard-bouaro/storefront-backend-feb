export interface RESPONSE {
	code: string;
	message: string;
	type: "error" | "success";
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

export interface REQUEST_WITH_USER {
	id: string;
	providerId: string;
}
