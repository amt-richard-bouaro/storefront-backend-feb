import express from 'express';
import passport from 'passport';
import swaggerDocs from './services/documentation/swagger';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
dotenv.config();
import { notFoundError, errorHandler } from './middlewares/errorHandlers';
import { findAccountByProviderId } from './endpoints/utils/operations/readOperations';
import { userSerialization } from './services/generalTypes';
import GoogleSignOption from './services/passport-google';
import LocalSignInOption from './services/passport-local';
import FacebookSignInOption from './services/passport-facebook';
import { SERVER_CONFIG } from './config/main';

const app = express();

app.use(
	cors({
		origin: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		credentials: true,
	})
);

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SERVER_CONFIG.SESSION_SECRET));

const redisClient = createClient({
	url: SERVER_CONFIG.REDIS_URL,
});

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

passport.serializeUser((user: userSerialization, callback) => {
	if (user.provider === 'local') {
		return callback(null, {
			providerId: user.providerId,
		});
	}

	return callback(null, {
		providerId: user.id,
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
	});
});

GoogleSignOption();
FacebookSignInOption();
LocalSignInOption();

const PORT: number = SERVER_CONFIG.PORT;

app.get('/', (req, res) => {
	return res.redirect('/api/v1/docs');
});

import accountEndpoints from './endpoints/account/root';
app.use('/api/account', accountEndpoints);

swaggerDocs(app, PORT);

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('app listening on port ' + PORT);
});
