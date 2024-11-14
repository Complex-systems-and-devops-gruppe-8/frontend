export type AuthState = {
    authTokens: AuthTokens;
    refreshTokens: boolean;
    rootEntity: any;
    authEntity: any;
    loginState: LoginState;
  }

export type AuthAction = 
  | {  type: 'LOGIN_SUCCESS',   payload: AuthTokens  } 
  | {  type: 'LOGIN_START', payload: { username: string, password: string }  }
  | {  type: 'LOGIN_FAILURE',  payload: string  }
  | {  type: 'LOGOUT_START' }
  | {  type: 'LOGOUT_SUCCESS' }
  | {  type: 'ROOT_ENTITY',  payload: any }
  | {  type: 'AUTH_ENTITY',  payload: any }
  | { type: 'SET_TOKENS_FROM_COOKIES',payload:  { accessToken: string; refreshToken: string } }
  | { type: 'TOKEN_VALIDATION_SUCCESS', payload: string | null}
  | { type: 'TOKEN_VALIDATION_FAILURE' }



export type LoginState = {
    startLogIn: boolean;
    error: string | null;
    loggedIn: boolean;
    startLogOut: boolean;
    inputUsername: string;
    inputPassword: string;
  }
 export interface AuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
  }
  
 export interface RefreshedAccessToken {
    accessToken: string;
  }