export class AuthState{
    userId:number = 0;
    userEmail:string = "";
    userFname:string = "";
    userLname:string = "";
    userAdmin:boolean = false;
    token:string = "";
}

export enum AuthActionType{
    login = "login",
    logout = "logout",
    setToken = "setToken"
}

export interface AuthAction{
    type: AuthActionType,
    payload?: any,
}

export function loginAction(user:any):AuthAction{
    return {type: AuthActionType.login, payload:user}
}

export function logoutAction():AuthAction{
    return {type:AuthActionType.logout}
}

export function setTokenAction(token:string):AuthAction{
    return {type:AuthActionType.setToken, payload:token}
}

export function AuthReducer(currentState: AuthState = new AuthState(), action:AuthAction):AuthState{
    let newState = {...currentState};

    switch (action.type) {
        case AuthActionType.login:
            if (action.payload) {
                return {
                    ...newState,
                    ...action.payload,
                };
            }
            return newState;
        case AuthActionType.logout:
            return new AuthState();
        case AuthActionType.setToken:
            if (typeof action.payload === 'string') {
                newState.token = action.payload;
            }
            return newState;
        default:
            return currentState;
    }
}