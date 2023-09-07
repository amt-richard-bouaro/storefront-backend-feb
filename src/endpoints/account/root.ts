import express from "express";
import passport from "passport";

const app = express.Router();

import { localRegistration } from "./controller/localRegistration";
// import { googleRegisterCustomer } from "./controller/googleRegisterCustomer";
import { accountVerification } from "./controller/verifyAccount";
import { SERVER_CONFIG } from "../../config/main";

app.post("/register/local", localRegistration);

app.get(
	"/register/google/customer",
	passport.authenticate("google-customer", { scope: ["profile", "email"] })
);

app.get(
	"/google/customer/callback",
	passport.authenticate("google-customer", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN,
		failureRedirect: "/login/failure",
	})
);

app.get(
	"/register/google/business",
	passport.authenticate("google-business", { scope: ["profile", "email"] })
);

app.get(
	"/google/business/callback",
	passport.authenticate("google-business", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN,
		failureRedirect: "/login/failure",
	})
);

app.put("/verify", accountVerification);

export default app;
