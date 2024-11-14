
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
            startLogOut: false,
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
                startLogOut: false,
                inputUsername: action.payload.username,
                inputPassword: action.payload.password
            }
        }
        
    case 'LOGOUT_START':
        return {
            ...state,
            loginState: {
                startLogIn: false,
                error: null,
                loggedIn: false,
                startLogOut: true,
                inputUsername: '',
                inputPassword: ''
            }
         
        }
    case 'LOGOUT_SUCCESS':
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
                startLogOut: false,
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
    case 'SET_TOKENS_FROM_COOKIES':
        return {
            ...state,
            refreshTokens: true,
            authTokens: {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        }
    
    case 'LOGIN_FAILURE':
        return {
            ...state,
            loginState: {
                startLogIn: false,
                error: action.payload,
                loggedIn: false,
                startLogOut: false,
                inputUsername: state.loginState.inputUsername,
                inputPassword: state.loginState.inputPassword
            }
        }
    case 'TOKEN_VALIDATION_SUCCESS':
        return {
            ...state,
            refreshTokens: false,
            authTokens: {
                ...state.authTokens,
                accessToken: action.payload
            },
            loginState: {
                startLogIn: false,
                error: null,
                startLogOut: false,
                loggedIn: true,
                inputUsername: '',
                inputPassword: ''
            }
        }
    case 'TOKEN_VALIDATION_FAILURE':
        return {
            ...state,
            refreshTokens: false,
            authTokens: {
                refreshToken: null,
                accessToken: null
            },
            loginState: {
                startLogIn: false,
                error: null,
                startLogOut: false,
                loggedIn: false,
                inputUsername: '',
                inputPassword: ''
            }
        }
    default:   
        return state
        
    }
}


