export type AuthState = {
    authTokens: AuthTokens;
   
    rootEntity: any;
    authEntity: any;
    loginState: LoginState;
  }

export type AuthAction = 
  | {  type: 'LOGIN_SUCCESS',   payload: AuthTokens  } 
  | {  type: 'LOGIN_START', payload: { username: string, password: string }  }
  | {  type: 'LOGIN_FAILURE',  payload: string  }
  | {  type: 'LOGOUT' }
  | {  type: 'ROOT_ENTITY',  payload: any }
  | {  type: 'AUTH_ENTITY',  payload: any }
  | { type: 'SET_ACCESS_TOKEN', payload: string | null }
  | { type: 'SET_REFRESH_TOKEN', payload: string | null }



export type LoginState = {
    startLogIn: boolean;
    error: string | null;
    loggedIn: boolean;
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