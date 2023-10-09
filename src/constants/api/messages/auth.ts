export const AUTH_MSG = {
	LOGIN_FAILED: {
		CODE: 'LOGIN_FAILED',
		MESSAGE:
			'Login failed. Please check your email and password and try again.',
	},
	ACCOUNT_NOT_FOUND: {
		CODE: 'ACCOUNT_NOT_FOUND',
		MESSAGE: 'Account not found. Please create an account before logging in.',
	},
	USER_NOT_FOUND: {
		CODE: 'USER_NOT_FOUND',
		MESSAGE: 'User could not found. Make sure that you are authenticated',
	},
	USER_FOUND: {
		CODE: 'USER_FOUND',
		MESSAGE: 'User authenticated successfully',
	},
	ACCOUNT_REGISTRATION_FAILED: {
		CODE: 'ACCOUNT_REGISTRATION_FAILED',
		MESSAGE: 'Account registration failed. Please try again later.',
	},
	EMAIL_ALREADY_IN_USE: {
		CODE: 'EMAIL_ALREADY_IN_USE',
		MESSAGE: 'The email address you provided is already in use.',
	},
	LOGIN_SUCCESSFUL: {
		CODE: 'LOGIN_SUCCESSFUL',
		MESSAGE: 'You have successfully logged in.',
	},
	LOGOUT_SUCCESSFUL: {
		CODE: 'LOGOUT_SUCCESSFUL',
		MESSAGE: 'You have been logged out successfully.',
	},
	LOGOUT_FAILED: {
		CODE: 'LOGOUT_FAILED',
		MESSAGE: 'Failed to log you out.',
	},
	WELCOME_BACK: {
		CODE: 'WELCOME_BACK',
		MESSAGE: 'Welcome back, [user name].',
	},
	ACCOUNT_CREATED_SUCCESSFULLY: {
		CODE: 'ACCOUNT_CREATED_SUCCESSFULLY',
		MESSAGE: 'Your account has been created successfully.',
	},
	VERIFICATION_CODE_SENT: {
		CODE: 'VERIFICATION_CODE_SENT',
		MESSAGE:
			'Your request has been accepted. A mail has already been sent to your email address with instructions to verify your account.',
	},
	VERIFY_ACCOUNT: {
		CODE: 'VERIFY_ACCOUNT',
		MESSAGE: 'Please check your email to verify your account.',
	},
	EMAIL_VERIFIED_SUCCESSFULLY: {
		CODE: 'EMAIL_VERIFIED_SUCCESSFULLY',
		MESSAGE: 'Your email address has been verified successfully.',
	},
	EMAIL_VERIFICATION_FAILED: {
		CODE: 'EMAIL_VERIFICATION_FAILED',
		MESSAGE: 'Email verification failed. Please try again later.',
	},
	EMAIL_VERIFICATION_TOKEN_EXPIRED: {
		CODE: 'EMAIL_VERIFICATION_TOKEN_EXPIRED',
		MESSAGE: 'The email verification token has expired.',
	},
	CODE_VERIFED: {
		CODE: 'VERIFICATION_CODE_VERIFED',
		MESSAGE:
			'We have verified the provided verification code. You can now go ahead and set up your new password.',
	},
	RESET_PASSWORD_EMAIL_SENT: {
		CODE: 'RESET_PASSWORD_EMAIL_SENT',
		MESSAGE: 'A password reset email has been sent to your email address.',
	},
	RESET_PASSWORD_SUCCESSFUL: {
		CODE: 'RESET_PASSWORD_SUCCESSFUL',
		MESSAGE: 'Your password has been reset successfully. Login to continue.',
	},
	RESET_PASSWORD_FAILED: {
		CODE: 'RESET_PASSWORD_FAILED',
		MESSAGE:
			'Password reset failed. Please try again by requesting for password reset.',
	},
	INVALID_RESET_PASSWORD_TOKEN: {
		CODE: 'INVALID_RESET_PASSWORD_TOKEN',
		MESSAGE: 'The password reset token is invalid.',
	},
	RESET_PASSWORD_TOKEN_EXPIRED: {
		CODE: 'RESET_PASSWORD_TOKEN_EXPIRED',
		MESSAGE: 'The password reset token has expired.',
	},
	REQUEST_CODE_CREATED: {
		CODE: 'REQUEST_CODE_CREATED',
		MESSAGE:
			'Your request has been accepted. A mail has already been sent to your email address with instructions to reset your password.',
	},
};
