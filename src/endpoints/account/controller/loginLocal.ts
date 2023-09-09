import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "../../../services/generalTypes";
import { STATUS } from "../../../config/main";
import { findAccountByEmail, passwordValidator } from "../../utils/reusableFunctions";
import {authenticate} from "../../../services/localAuth"




export const handleLoginLocal = (
	req: Request,
	res: Response<RESPONSE>,
	next: NextFunction
) => {


    // authenticate("local", req, res);

    console.log(req.isAuthenticated());
    
	return res.status(STATUS.UNAUTHORIZED).json({
		code: "UNAUTHORIZED",
		message: "Invalid credentials",
		type: "error",
	});
};
