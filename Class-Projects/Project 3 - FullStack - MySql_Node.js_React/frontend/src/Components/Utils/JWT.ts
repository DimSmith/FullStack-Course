import { store } from '../Redux/store';
import { decodeToken } from 'react-jwt';
import { loginAction } from '../Redux/AuthReducer';
import { User } from '../Modal/User';

interface DecodedToken {
    id: number;
    fname: string;
    lname: string;
    email: string;
    role: number;
    iat: number;
    exp: number;
    jwt: string;
}

export const checkJWT = (): boolean => {
    let jwt = '';
    jwt = sessionStorage.getItem('jwt')?.split(' ')[1] || '';
    if (jwt.length < 10) {
    jwt = localStorage.getItem('jwt')?.split(' ')[1] || '';
    } 

    if (jwt.length < 10) {
        return false;
    }

    try {
        const myDecoded = decodeToken(jwt) as DecodedToken;
        const userCred: User = {
            userId: myDecoded.id,
            userEmail: myDecoded.email,
            userFname: myDecoded.fname,
            userLname: myDecoded.lname,
            userAdmin: myDecoded.role,
            userPass: myDecoded.jwt
        };
        store.dispatch(loginAction(userCred));
        return true;
    } catch (error) {
        return false;
    }
};