import { AuthState } from "./AuthContext";

type AuthAction { type: 'signIn'};
export const authReducer = (state : AuthState, action: AuthAction ) : AuthState => {
    switch (action.type) {
        case 'signIn':
            return{
                ...state,
                isLoggedIn: true,
                
            }
            break;
    
        default:
            return state;
    }
}