
import { Request, Response, NextFunction } from "express"
import { STATUS } from "../config/main";
import { REQUEST_WITH_USER, USER, ACCOUNTS, RESPONSE  } from "../services/generalTypes";
import { findAccountById } from "../endpoints/utils/reusableFunctions";


export const restrictedTo = (to: ACCOUNTS[]) => async (req: Request, res: Response, next: NextFunction) => {
    
if (!req.isAuthenticated()) {
        return res.status(STATUS.UNAUTHORIZED).json({
            code: "UNAUTHORIZED",
            message: "Permission denied. Please make sure you have permission to access this system",
            type: "error",
        });
    }

    const requestUser = <REQUEST_WITH_USER>req.user;

    const user = await findAccountById(requestUser.id);
    
}


export const ensureOnlyAuthorized = async (req: Request, res: Response<RESPONSE>, next: NextFunction) => {
    
    if (!req.isAuthenticated()) {
        return res.status(STATUS.UNAUTHORIZED).json({
            code: "UNAUTHORIZED",
            message: "Permission denied. Please make sure you have permission to access this system",
            type: "error",
        });
    }

    const requestUser = <REQUEST_WITH_USER>req.user;

    const user = await findAccountById(requestUser.id);

    if (!user) {
        return res.status(STATUS.UNAUTHORIZED).json({
            code: "UNAUTHORIZED",
            message: "Unauthorized: Could not find any user",
            type: "error",
        });
    }

    const foundUser = user as USER
    
    if (!foundUser.isActive || !foundUser.verified || foundUser.mustChangePassword) {
        return res.status(STATUS.UNAUTHORIZED).json({
            code: "UNAUTHORIZED",
            message: !foundUser.verified ? 'Account is not verified. You can request for verification at https://..': foundUser.mustChangePassword ? 'You must change your password before you can continue' : !foundUser.isActive ? 'Account is not actived.' :  'You are not authorized',
            type: "error",
        });
    }

    return next();

}

