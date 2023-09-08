import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "../../../services/generalTypes";
import { STATUS } from "../../../config/main";

export const handleFailure = (req: Request, res: Response<RESPONSE>, next: NextFunction) => {
    res.status(STATUS.UNAUTHORIZED).json({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
        type: "error"
    })
};