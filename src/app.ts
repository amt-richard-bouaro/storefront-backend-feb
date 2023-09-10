import express from "express";
import passport from "passport";
import swaggerDocs from "./services/documentation/swagger";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import { findAccountByProviderId } from "./endpoints/utils/reusableFunctions";
import { userSerialization } from "./services/generalTypes";
import GoogleSignOption from "./services/passport-google";
import LocalSignInOption from "./services/passport-local";
import FacebookSignInOption from "./services/passport-facebook";
import { SERVER_CONFIG } from "./config/main";



const app = express();

app.use(
	cors({
		origin: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SERVER_CONFIG.SESSION_SECRET));

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
	client: redisClient,
	prefix: "storefront",
});

app.use(
	session({
		store: redisStore,
		secret: SERVER_CONFIG.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60 * 24,
			// sameSite: "none",
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: userSerialization, callback) => {
	if (user.provider === "local") {
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
		let err = new Error();
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

app.get("/", (req, res) => {
	return res.redirect("/api/v1/docs");
});

import accountEndpoints from "./endpoints/account/root";
app.use("/api/account", accountEndpoints);

swaggerDocs(app, PORT);

import { notFoundError, errorHandler } from "./middlewares/errorHandlers";

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log("app listening on port " + PORT);
});
