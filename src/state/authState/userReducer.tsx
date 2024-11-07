
import { AuthState, AuthAction } from "./authTypes"


export const authReducer = (
    state: AuthState,
    action: AuthAction, ) : AuthState => {
    const { type } = action
    switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authTokens: action.payload,
        isAuthenticated: true
      }
    case 'LOGOUT':
        return {
            ...state,
            authTokens: null,
            isAuthenticated: false
        }


    default:   
        return state
        
    }
}


