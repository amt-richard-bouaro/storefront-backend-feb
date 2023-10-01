import express, { Response, Request } from 'express';
import passport from 'passport';
import { localRegistration } from './controller/localRegistration';
import { handleFailure } from './controller/handleFailure';
import { authenticatedUser } from './controller/authenticatedUser';
import { handleLogout } from './controller/handleLogout';
import { accountVerification } from './controller/verifyAccount';
import { SERVER_CONFIG, STATUS } from '../../config/main';
import { RESPONSE, USER } from '../../services/generalTypes';
import { checkIf, isAuthenticated } from '../../middlewares/authenticate';
import { resetPassword } from './controller/passwordReset';
import { requestPasswordReset } from './controller/requestPasswordReset';
import { verifyPasswordResetCode } from './controller/verifyPasswordResetCode';
import { activateAccount } from '../utils/operations/updateOperations';
import { resendVerificationCode } from './controller/resendVerificationCode';
import { errorHandler } from '../../middlewares/errorHandlers';
import { socialRegFailure } from './controller/socialRegFailure';
import { socialLoginFailure } from './controller/socialLoginFailure';

const app = express.Router();

app.post('/register/local', localRegistration);
app.get('/login/failure', handleFailure);
app.get('/social/registration/failure', socialRegFailure);
app.get('/social/login/failure', socialLoginFailure);
app.get('/auth/user', isAuthenticated, authenticatedUser);
app.get('/logout', handleLogout);
app.post('/verify', isAuthenticated, accountVerification);
app.put(
	'/password/reset',
	checkIf(['mustChangePassword', 'canResetPassword']),
	resetPassword
);

app.post('/request/password/reset', requestPasswordReset);
app.post(
	'/password/resetCode/verify',
	checkIf(['verified', 'mustChangePassword']),
	verifyPasswordResetCode
);
app.get('/resend/code', isAuthenticated, resendVerificationCode);

app.post(
	'/login/local',
	passport.authenticate('local-auth', {
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	}),
	async function (req: Request, res: Response<RESPONSE>) {
		try {
			const user: USER = req.user as USER;

			await activateAccount(user.id);

			return res.status(STATUS.OK).json({
				code: 'LOGGED_IN',
				message: 'Logged in successfully',
				type: 'success',
				data: {
					id: user.id,
					email: user.email,
					type: user.type,
					verified: user.verified,
					isActive: user.isActive,
					mustChangePassword: user.mustChangePassword,
					canResetPassword: user.canResetPassword,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					customer: user.customer && user.customer.id,
					business: user.business && user.business.id,
				},
			});
		} catch (error) {
			const err = error as Error;

			errorHandler(err, req, res);
		}
	}
);

app.get(
	'/google/customer',
	passport.authenticate('google-customer', { scope: ['profile', 'email'] })
);

app.get(
	'/google/customer/callback',
	passport.authenticate('google-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

app.get(
	'/google/business',
	passport.authenticate('google-business', { scope: ['profile', 'email'] })
);

app.get(
	'/google/business/callback',
	passport.authenticate('google-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

app.get(
	'/google/auth',
	passport.authenticate('google-auth', { scope: ['profile', 'email'] })
);

app.get(
	'/google/auth/callback',
	passport.authenticate('google-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

app.get(
	'/facebook/customer',
	passport.authenticate('facebook-customer', { scope: [] })
);

app.get(
	'/facebook/customer/callback',
	passport.authenticate('facebook-customer', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

app.get(
	'/facebook/business',
	passport.authenticate('facebook-business', { scope: [] })
);

app.get(
	'/facebook/business/callback',
	passport.authenticate('facebook-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/registration/failure',
		failureFlash: true,
	})
);

app.get(
	'/facebook/auth',
	passport.authenticate('facebook-auth', { scope: [] })
);

app.get(
	'/facebook/auth/callback',
	passport.authenticate('facebook-auth', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString() + '/login',
		failureRedirect: '/api/account/social/login/failure',
		failureFlash: true,
	})
);

export default app;
