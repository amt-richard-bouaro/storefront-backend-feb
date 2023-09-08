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

import { SERVER_CONFIG } from "./config/main";
import { findAccountById } from "./endpoints/utils/reusableFunctions";
import { userSerialization } from "./services/generalTypes";

require("./services/passport-google");
require("./services/passport-facebook");
require("./services/passport-local");

passport.serializeUser((user: userSerialization, callback) => {
	return callback(null, {
		id: user.id,
	});
});

passport.deserializeUser(async (user: userSerialization, callback) => {
	const User = await findAccountById(user.id);

	if (!User) {
		let err = new Error();
		return callback(null, err);
	}

	return callback(null, {
		id: user.id,
		type: user.type,
		verified: user.verified,
		isActive: user.isActive,
		mustChangePassword: user.mustChangePassword,
	});
});

const app = express();

const PORT: number = SERVER_CONFIG.PORT;

app.use(
	cors({
		origin: SERVER_CONFIG.CLIENT_ORIGIN,
		// methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
		resave: true,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);

app.use(cookieParser(SERVER_CONFIG.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

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
