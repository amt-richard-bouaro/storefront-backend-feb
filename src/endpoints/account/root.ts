import express from "express";

const app = express.Router();

import { localRegistration } from "./controller/localRegistration";
import { accountVerification } from "./controller/verifyAccount";


app.post("/register/local", localRegistration);

app.put("/verify", accountVerification);


export default app;
