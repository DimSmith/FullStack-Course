import { Request, Response, NextFunction } from 'express';
import { checkJWT } from '../Utils/jwt';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') || '';
    const isValidToken = await checkJWT(token);

    if (!isValidToken) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    next();
};