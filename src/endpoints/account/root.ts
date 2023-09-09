import express from "express";
import passport from "passport";

const app = express.Router();

import { localRegistration } from "./controller/localRegistration";
import { handleFailure } from "./controller/handleFailure";
import { authenticatedUser } from "./controller/authenticatedUser";
import { handleLogout } from "./controller/handleLogout";
import { handleLoginLocal } from "./controller/loginLocal";
import { accountVerification } from "./controller/verifyAccount";
import { SERVER_CONFIG } from "../../config/main";


app.post("/register/local", localRegistration);
app.get("/login/local", handleLoginLocal);
app.get("/login/failure", handleFailure);
app.get("/auth/user", authenticatedUser);
app.get("/logout", handleLogout);


app.get(
	"/google/customer", passport.authenticate("google-customer", { scope: ["profile", "email"] })
);

app.get(
	"/google/customer/callback",
	passport.authenticate("google-customer", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: "/api/account/login/failure",
	})
);

app.get(
	"/google/business",
	passport.authenticate("google-business", { scope: ["profile", "email"] })
);

app.get(
	"/google/business/callback",
	passport.authenticate("google-business", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: "/api/account/login/failure",
	})
);

app.get(
	"/facebook/customer",
	passport.authenticate("facebook-customer", { scope: [] })
);

app.get(
	"/facebook/customer/callback",
	passport.authenticate("facebook-customer", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: "/api/account/login/failure",
	})
);

app.get(
	"/facebook/business",
	passport.authenticate("facebook-business", { scope: [] })
);

app.get(
	"/facebook/business/callback",
	passport.authenticate("facebook-business", {
		successRedirect: SERVER_CONFIG.CLIENT_ORIGIN.toString(),
		failureRedirect: "/api/account/login/failure",
	})
);

app.put("/verify", accountVerification);

export default app;
