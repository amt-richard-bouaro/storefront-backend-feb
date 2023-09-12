import express, { Response, Request, NextFunction } from 'express';
import passport from 'passport';

const app = express.Router();

import { localRegistration } from './controller/localRegistration';
import { handleFailure } from './controller/handleFailure';
import { authenticatedUser } from './controller/authenticatedUser';
import { handleLogout } from './controller/handleLogout';
import { accountVerification } from './controller/verifyAccount';
import { SERVER_CONFIG, STATUS } from '../../config/main';
import { RESPONSE, USER } from '../../services/generalTypes';
import { ensureOnlyAuthorized } from '../../middlewares/authenticate';
import { resetPassword } from './controller/passwordReset';
import { requestPasswordReset } from './controller/requestPasswordReset';
import { verifyPasswordResetCode } from './controller/verifyPasswordResetCode';
import { activateAccount } from '../utils/operations/updateOperations';

app.post('/register/local', localRegistration);
app.get('/login/failure', handleFailure);
app.get('/auth/user', ensureOnlyAuthorized(), authenticatedUser);
app.get('/logout', handleLogout);

app.put('/password/reset', resetPassword);
app.put('/request/password/reset', requestPasswordReset);
app.post('/password/resetCode/verify', verifyPasswordResetCode);

app.post(
	'/login/local',
	passport.authenticate('local-auth', {
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	}),
	async function (req: Request, res: Response<RESPONSE>, next: NextFunction) {
		try {
			const user: USER = req.user as USER;

			if (user.verified) {
				await activateAccount(user.id);
			}

			return res.status(STATUS.OK).json({
				code: 'LOGGED_IN',
				message: 'Logged in successfully',
				type: 'success',
				data: {
					id: user.id,
					email: user.email,
					type: user.type,
					provider: user.provider,
					providerId: user.providerId,
					verified: user.verified,
					isActive: user.isActive,
					mustChangePassword: user.mustChangePassword,
					canResetPassword: user.canResetPassword,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					customer: user.customer,
					business: user.business,
				},
			});
		} catch (error) {
			const err = error as Error;

			next(err);
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
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
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
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	})
);

app.get(
	'/google/auth',
	passport.authenticate('google-auth', { scope: ['profile', 'email'] })
);

app.get(
	'/google/auth/callback',
	passport.authenticate('google-business', {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
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
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
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
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
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
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: '/api/account/login/failure',
		failureFlash: true,
	})
);

app.put('/verify', accountVerification);

export default app;
