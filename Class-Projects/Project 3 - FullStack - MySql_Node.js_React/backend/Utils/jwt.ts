/// <reference types="node" />

import { UserCred } from "../Models/UserCred";
import jwt from 'jsonwebtoken';


const secretKey = "the-secret-key-need-to-be-at-least-256-bytes";

const createJWT = (user: UserCred): string => {
    const payload = {
        id: user.userId,
        fname: user.userFname,
        lname: user.userLname,
        email: user.userEmail,
        role: user.userAdmin
    };

    const options: jwt.SignOptions = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

const checkJWT = (token: string): string | null => {
    try {
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token; 
        const decoded = jwt.verify(tokenWithoutBearer, secretKey) as jwt.JwtPayload;
        
        return createJWT(new UserCred(
            decoded.id,
            decoded.fname,
            decoded.lname,
            decoded.email,
            decoded.role,
            ''
        ));
    } catch (err) {
        return null;
    }
};

export {
    createJWT,
    checkJWT,
};