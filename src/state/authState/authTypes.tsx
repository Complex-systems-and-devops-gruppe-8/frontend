export type AuthState = {
    authTokens : AuthTokens | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }

export type AuthAction = 
  | {  type: 'LOGIN_SUCCESS',   payload: AuthTokens  } 
  | {  type: 'LOGOUT' }

  interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  
  interface RefreshedAccessToken {
    accessToken: string;
  }