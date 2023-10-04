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

const account = express.Router();

account.post('/register/local', localRegistration);
account.get('/login/failure', handleFailure);
account.get('/social/registration/failure', socialRegFailure);
account.get('/social/login/failure', socialLoginFailure);
account.get('/auth/user', isAuthenticated, authenticatedUser);
account.get('/logout', handleLogout);
account.post('/verify', isAuthenticated, accountVerification);
account.put(
	'/password/reset',
	checkIf(['mustChangePassword', 'canResetPassword']),
	resetPassword
);

account.post('/request/password/reset', requestPasswordReset);
account.post(
	'/password/resetCode/verify',
	checkIf(['verified', 'mustChangePassword']),
	verifyPasswordResetCode
);
account.get('/resend/code', isAuthenticated, resendVerificationCode);

account.post(
	'/login/local',
	passport.authenticate('local-auth', {
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	}),
	localLogin
);

// Customer account registration - Google provider
account.get(
	'/google/customer',
	passport.authenticate('google-customer', { scope: ['profile', 'email'] })
);

account.get(
	'/google/customer/callback',
	passport.authenticate('google-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Business account registration - Google provider
account.get(
	'/google/business',
	passport.authenticate('google-business', { scope: ['profile', 'email'] })
);

account.get(
	'/google/business/callback',
	passport.authenticate('google-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Authentication - Google provider
account.get(
	'/google/auth',
	passport.authenticate('google-auth', { scope: ['profile', 'email'] })
);

account.get(
	'/google/auth/callback',
	passport.authenticate('google-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

// Customer account registration - Facebook provider
account.get(
	'/facebook/customer',
	passport.authenticate('facebook-customer', { scope: [] })
);

account.get(
	'/facebook/customer/callback',
	passport.authenticate('facebook-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Business account registration - Facebook provider
account.get(
	'/facebook/business',
	passport.authenticate('facebook-business', { scope: [] })
);

account.get(
	'/facebook/business/callback',
	passport.authenticate('facebook-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

// Authentication - Facebook provider
account.get(
	'/facebook/auth',
	passport.authenticate('facebook-auth', { scope: [] })
);

account.get(
	'/facebook/auth/callback',
	passport.authenticate('facebook-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

export default account;
