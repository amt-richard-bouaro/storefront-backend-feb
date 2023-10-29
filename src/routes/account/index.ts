import express from 'express';
import passport from 'passport';

import { localRegistration } from '../../controllers/account/localRegistration';
import { handleFailure } from '../../controllers/account/handleFailure';
import { socialRegFailure } from '../../controllers/account/socialRegFailure';
import { socialLoginFailure } from '../../controllers/account/socialLoginFailure';
import { authenticatedUser } from '../../controllers/account/authenticatedUser';
import { handleLogout } from '../../controllers/account/handleLogout';
import {
	checkIf,
	isAuthenticated,
} from '../../middlewares/authentication/authenticate';
import { accountVerification } from '../../controllers/account/verifyAccount';
import { resetPassword } from '../../controllers/account/passwordReset';
import { requestPasswordReset } from '../../controllers/account/requestPasswordReset';
import { verifyPasswordResetCode } from '../../controllers/account/verifyPasswordResetCode';
import { resendVerificationCode } from '../../controllers/account/resendVerificationCode';
import { localLogin } from '../../controllers/account/loginLocal';

import { SERVER_CONFIG } from '../../config';
import { ACCOUNT } from '../../constants/api/endpoints';

const account = express.Router();

account.post(ACCOUNT.CREATE_ACCOUNT_LOCAL, localRegistration);
account.get(ACCOUNT.AUTH_FAILURE_LOCAL, handleFailure);
account.get(ACCOUNT.SOCIAL_REGISTRATION_FAILURE, socialRegFailure);
account.get(ACCOUNT.SOCIAL_AUTH_FAILURE, socialLoginFailure);
account.get(ACCOUNT.GET_AUTH_ACCOUNT, isAuthenticated, authenticatedUser);
account.get(ACCOUNT.LOGOUT, isAuthenticated, handleLogout);
account.post(ACCOUNT.VERIFY_ACCOUNT, isAuthenticated, accountVerification);
account.put(
	ACCOUNT.PASSWORD_RESET,
	checkIf(['mustChangePassword', 'canResetPassword']),
	resetPassword
);

account.post(ACCOUNT.REQUEST_PASSWORD_RESET, requestPasswordReset);
account.post(
	ACCOUNT.VERIFY_RESET_CODE,
	checkIf(['verified', 'mustChangePassword']),
	verifyPasswordResetCode
);
account.get(
	ACCOUNT.RESEND_VERIFICATION_CODE,
	isAuthenticated,
	resendVerificationCode
);

account.post(
	ACCOUNT.AUTH_ACCOUNT_LOCAL,
	passport.authenticate('local-auth', {
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	}),
	localLogin
);

// Customer account registration - Google provider
account.get(
	ACCOUNT.CREATE_CUSTOMER_ACCOUNT_GOOGLE,
	passport.authenticate('google-customer', { scope: ['profile', 'email'] })
);

account.get(
	ACCOUNT.GOOGLE_CUSTOMER_CALLBACK,
	passport.authenticate('google-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Business account registration - Google provider
account.get(
	ACCOUNT.CREATE_BUSINESS_ACCOUNT_GOOGLE,
	passport.authenticate('google-business', { scope: ['profile', 'email'] })
);

account.get(
	ACCOUNT.GOOGLE_BUSINESS_CALLBACK,
	passport.authenticate('google-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Authentication - Google provider
account.get(
	ACCOUNT.AUTH_ACCOUNT_GOOGLE,
	passport.authenticate('google-auth', { scope: ['profile', 'email'] })
);

account.get(
	ACCOUNT.GOOGLE_AUTH_CALLBACK,
	passport.authenticate('google-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

// Customer account registration - Facebook provider
account.get(
	ACCOUNT.CREATE_CUSTOMER_ACCOUNT_FACEBOOK,
	passport.authenticate('facebook-customer', { scope: [] })
);

account.get(
	ACCOUNT.FACEBOOK_CUSTOMER_CALLBACK,
	passport.authenticate('facebook-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Business account registration - Facebook provider
account.get(
	ACCOUNT.CREATE_BUSINESS_ACCOUNT_FACEBOOK,
	passport.authenticate('facebook-business', { scope: [] })
);

account.get(
	ACCOUNT.FACEBOOK_BUSINESS_CALLBACK,
	passport.authenticate('facebook-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Authentication - Facebook provider
account.get(
	ACCOUNT.AUTH_ACCOUNT_FACEBOOK,
	passport.authenticate('facebook-auth', { scope: [] })
);

account.get(
	ACCOUNT.FACEBOOK_AUTH_CALLBACK,
	passport.authenticate('facebook-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

export default account;
