import { Request, Response, NextFunction } from "express";
import { RouteNotFound } from "../Models/ClientsErrors";

export const routeNotFoundHandler = (request: Request, response: Response, next: NextFunction) => {
    const err = new RouteNotFound(request.originalUrl);
    next(err);
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred';

    res.setHeader('Content-Type', 'application/json');
    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
}