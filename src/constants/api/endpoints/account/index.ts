export const ACCOUNT = {
	BASE_ROUTE: '/api/account',

	GET_AUTH_ACCOUNT: '/auth/user',

	REQUEST_PASSWORD_RESET: '/request/password/reset',
	PASSWORD_RESET: '/password/reset',
	VERIFY_RESET_CODE: '/password/resetCode/verify',
	VERIFY_ACCOUNT: '/verify',
	RESEND_VERIFICATION_CODE: '/resend/code',

	LOGOUT: '/logout',

	AUTH_ACCOUNT_LOCAL: '/login/local',
	AUTH_ACCOUNT_GOOGLE: '/google/auth',
	AUTH_ACCOUNT_FACEBOOK: '/facebook/auth',

	AUTH_FAILURE_LOCAL: '/login/failure',
	SOCIAL_AUTH_FAILURE: '/social/login/failure',
	SOCIAL_REGISTRATION_FAILURE: '/social/registration/failure',

	CREATE_ACCOUNT_LOCAL: '/register/local',

	CREATE_BUSINESS_ACCOUNT_GOOGLE: '/google/business',
	CREATE_BUSINESS_ACCOUNT_FACEBOOK: '/facebook/business',

	CREATE_CUSTOMER_ACCOUNT_GOOGLE: '/google/customer',
	CREATE_CUSTOMER_ACCOUNT_FACEBOOK: '/facebook/customer',

	FACEBOOK_BUSINESS_CALLBACK: '/facebook/business/callback',
	FACEBOOK_CUSTOMER_CALLBACK: '/facebook/customer/callback',

	GOOGLE_BUSINESS_CALLBACK: '/google/business/callback',
	GOOGLE_CUSTOMER_CALLBACK: '/google/customer/callback',

	GOOGLE_AUTH_CALLBACK: '/google/auth/callback',
	FACEBOOK_AUTH_CALLBACK: '/facebook/auth/callback',
} as const;
