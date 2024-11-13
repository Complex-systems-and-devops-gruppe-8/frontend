
import { AuthState, AuthAction } from "./authTypes"


export const authReducer = (
    state: AuthState,
    action: AuthAction, ) : AuthState => {
    const { type } = action
    switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginState: {
            startLogIn: false,
            error: null,
            loggedIn: true,
            inputUsername: '',
            inputPassword: ''
        },
        authTokens: {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken

        }  
        
      }
    case 'LOGIN_START':
        return {
            ...state,
            loginState: {
                startLogIn: true,
                error: null,
                loggedIn: false,
                inputUsername: action.payload.username,
                inputPassword: action.payload.password
            }
        }
        
    case 'LOGOUT':
        return {
            ...state,
         authTokens: {
            accessToken: null,
            refreshToken: null
        },
            loginState: {
                startLogIn: false,
                error: null,
                loggedIn: false,
                inputUsername: '',
                inputPassword: ''
            }
        }
    case 'ROOT_ENTITY':
        return {
            ...state,
            rootEntity: action.payload
        }
    case 'AUTH_ENTITY':
        return {
            ...state,
            authEntity: action.payload
        }      
    case 'SET_ACCESS_TOKEN':
        return {
            ...state,
            authTokens: {
                ...state.authTokens,
                accessToken: action.payload
            }
        }
    case 'SET_REFRESH_TOKEN':
        return {
            ...state,
            authTokens: {
                ...state.authTokens,
                refreshToken: action.payload
            }
        }
    case 'LOGIN_FAILURE':
        return {
            ...state,
            loginState: {
                startLogIn: false,
                error: action.payload,
                loggedIn: false,
                inputUsername: state.loginState.inputUsername,
                inputPassword: state.loginState.inputPassword
            }
        }
    default:   
        return state
        
    }
}


