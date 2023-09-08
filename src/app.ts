import express from "express";
import passport from "passport";
import swaggerDocs from "./services/documentation/swagger";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import { SERVER_CONFIG } from "./config/main";


require("./services/passportStrategies")


const app = express();

const PORT: number = SERVER_CONFIG.PORT;


app.use(
	cors({
		origin: SERVER_CONFIG.CLIENT_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(helmet());

app.use(express.json());

app.use(session({
	secret: SERVER_CONFIG.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
}))

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
