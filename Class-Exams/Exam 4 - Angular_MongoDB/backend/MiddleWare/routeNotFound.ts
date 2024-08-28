import {Request,Response, NextFunction, request} from "express";

import {RouteNotFound} from "../Models/ClientsErrors";

const ErrorHandler = (request:Request, response:Response, nextFunction:NextFunction) =>{
    const err = new RouteNotFound(request.originalUrl);
    nextFunction(err);
}

export default ErrorHandler;