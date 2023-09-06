import { Request, Response, NextFunction } from "express";
import { RESPONSE } from "../services/generalTypes";
import { STATUS } from "../config/main";
import { z } from 'zod'


export const notFoundError = (req:Request, res:Response<RESPONSE>, next:NextFunction ) => {
    
    return res.status(STATUS.NOT_FOUND).json({
        code: "NOT_FOUND",
        message: "The specified route does not exist",
        type: "error",
    })
}

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {

    let status = STATUS.INTERNAL_SERVER_ERROR;

    let errorResponse = { 
        code: 'ERROR',
        message: err.message,
        type: 'error'
    }


    if (err instanceof z.ZodError) {
        return res.status(STATUS.BAD_REQUEST).json({
            code: "VALIDATION_ERROR",
            message: "Parameters failed validation",
            type: "error",
            error: err.errors
      })
    }



    return res.status(status).json(errorResponse)

}