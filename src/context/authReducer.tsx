export interface AuthState {
    status : 'checking' |'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage : string 
    user : Usuario | null
}

import { Usuario } from "../interfaces/appInterfaces";

type AuthAction =  
    | { type: 'signUp', payload : {token: string, user: Usuario}}
    | {type: 'addError', payload: string}
    | {type : 'removeError'}
    | {type: 'notAuthenticated'}
    | {type : 'logout'}
    | {type : 'editUser', payload : Usuario}

export const authReducer = (state : AuthState, action : AuthAction) : AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token : 'null',
                errorMessage : action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'signUp' :
            return {
                ...state,
                errorMessage: '',
                status: `${!action.payload.user.email ? 'not-authenticated' : 'authenticated'}`,
                token: action.payload.token,
                user : action.payload.user
            }
            
        case 'logout' :
        case 'notAuthenticated' :
            return {
                ...state,
                status : 'not-authenticated',
                token: null, 
                user : null
            }
        default:
            return state;
    }
}