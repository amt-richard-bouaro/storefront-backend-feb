import express from 'express';
import passport from 'passport';
import swaggerDocs from './services/documentation/swagger';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import {
	notFoundError,
	errorHandler,
} from './middlewares/errorhandlers/exceptions';
import GoogleSignOption from './services/passport/google';
import LocalSignInOption from './services/passport/local';
import FacebookSignInOption from './services/passport/facebook';
import { SERVER_CONFIG } from './config/index';
import { findAccountByProviderId } from './services/app/account/findAccount';
import routes from './routes';
import { userSerialization } from './interfaces';

export const redisClient = createClient({
	url: SERVER_CONFIG.REDIS_URL,
});
function server() {
	const app = express();

	app.use(
		cors({
			origin: function (origin, callback) {
				if (origin && SERVER_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			},
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		})
	);

	app.use(helmet());

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(bodyParser.json());

	app.use(cookieParser(SERVER_CONFIG.SESSION_SECRET));



	redisClient.connect().catch(console.error);

	const redisStore = new RedisStore({
		client: redisClient,
		prefix: 'storefront',
	});

	app.use(
		session({
			store: redisStore,
			secret: SERVER_CONFIG.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: SERVER_CONFIG.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24,
				sameSite: 'lax',
			},
		})
	);

	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, callback) => {
		const User = <userSerialization>user;
		if (User.provider === 'local') {
			return callback(null, {
				providerId: User.providerId,
			});
		}

		return callback(null, {
			providerId: User.id,
		});
	});

	passport.deserializeUser(async (user: userSerialization, callback) => {
		const User = await findAccountByProviderId(user.providerId);

		if (!User) {
			return callback(null, false);
		}

		return callback(null, {
			id: User.id,
			providerId: User.providerId,
			customer: User.customer?.id,
			business: User.business?.id,
		});
	});

	GoogleSignOption();
	FacebookSignInOption();
	LocalSignInOption();

	routes(app);

	swaggerDocs(app);

	app.use(notFoundError);
	app.use(errorHandler);

	return app;
}

export default server;
