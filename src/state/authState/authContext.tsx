import React, { createContext,  useEffect, Dispatch,useReducer    } from 'react';
 
import { sirenClient } from '../../api/sirenClient';
import { Action } from '@siren-js/client';
import { AuthState, AuthAction  } from './authTypes'
import { authReducer  } from './userReducer'
import { AuthTokens } from './authTypes';
 import { RefreshedAccessToken } from './authTypes'; 
 import { setCookie, getCookie, deleteCookie } from '../../utils/cookieUtils';


const initialState: AuthState = {
  authTokens: { accessToken: null, refreshToken: null },
  refreshTokens: false,
  
  rootEntity: null,
  authEntity: null,
  refreshTimerFlag: false,
  loginState: {
    startLogIn: false,
    error: null,
    startLogOut: false,
    loggedIn: false,
    inputUsername: '',
    inputPassword: ''
  }

};

export const AuthContext = createContext<
{
  state: AuthState
  dispatch: Dispatch<AuthAction>,
}>({
  state: initialState,
  dispatch: () => null, // Placeholder function
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
 
  
  /**
   * Initializes the authentication system by fetching root and auth entities.
   * Runs once when the component mounts.
   */
  useEffect(() => {
    if(!state.rootEntity) {
    const init = async () => {
      try {
        const root = await sirenClient.followAndParse('/');
        dispatch({ type: 'ROOT_ENTITY', payload: root })

        const authLink = root.links.find((link: any) => link.rel.includes('auth'));
        if (authLink) {
          const auth = await sirenClient.followAndParse(authLink.href);
          dispatch({ type: 'AUTH_ENTITY', payload: auth })
        }
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
      // Initialize cookies
     const accessToken = getCookie('accessToken');
     const refreshToken = getCookie('refreshToken');
     
     if (accessToken && refreshToken) {
       dispatch({ type: 'SET_TOKENS_FROM_COOKIES', payload: {   accessToken , refreshToken } });
       sirenClient.setAccessToken(accessToken || null);


      }
     }
     init() 
    }

  }, []);

  useEffect(() => {
    if(state.refreshTokens) {
      refreshAccessToken();
    }
  }
  , [state.refreshTokens]);

  /**
   * Updates the token reference and Siren client when tokens change.
   * Ensures the latest token values are available for the refresh mechanism.
   */
  useEffect(() => {
    sirenClient.setAccessToken(state.authTokens?.accessToken || null);
  }, [state.authTokens]);


  /**
   * Cheks if the user is trying to login
   */
  useEffect(() => {
    if (state.loginState.startLogIn) {
      login();
    }
  }, [state.loginState.startLogIn]);
  
  useEffect(() => {
    if (state.loginState.startLogOut) {
      logout();
    }
  }, [state.loginState.startLogOut]);

  /**
   * Automatic token refresh mechanism.
   * Refreshes the access token every 270 seconds if auth entity is available.
   * Redirects to login page if refresh fails.
   */
  useEffect(() => {
    let refreshTimer: number;
    if (state.authEntity,!state.refreshTimerFlag) {
      refreshTimer = window.setInterval(refreshAccessToken, 150000);

      dispatch({ type: 'SET_REFRESH_TIMER' });
    }

    return () => {
      if (refreshTimer) {
        window.clearInterval(refreshTimer);
        dispatch({ type: 'CLEAR_REFRESH_TIMER' });
      }
    };
  }, [state.authEntity]);



  
  const refreshAccessToken = async () => {
    // Use the ref to get current token values
    const { accessToken, refreshToken } = state.authTokens;

    console.log('Attempting token refresh...');
    


    if (!state.authEntity || !state.authTokens.accessToken || !state.authTokens.refreshToken) {
      console.log('Missing required data for refresh');
      return;
    }

    try {
      const refreshAction = state.authEntity.actions.find(
        (action: Action) => action.name === 'refresh-access-token'
      );

      if (!refreshAction) {
        console.log('Refresh action not found');
        return;
      }

      const response = await sirenClient.submitAndParse<RefreshedAccessToken>(refreshAction, {
        accessToken,
        refreshToken
      });

      console.log('Token refresh successful');

      const tokens = response.properties;
      
      dispatch({ type: 'TOKEN_VALIDATION_SUCCESS', payload: tokens.accessToken });
      setCookie('accessToken', tokens.accessToken, 1);
    } catch (error) {
      dispatch({ type: 'TOKEN_VALIDATION_FAILURE'    });
      console.error('Token refresh failed:', error);
      logout();
      
    }
  };
   




  /**
   * 
   *  Logs the user in by submitting the login action with the provided credentials.
   * 
   */  
  const login = async () => {
    // Ensure authEntity is available
  if (!state.authEntity) {
    dispatch({ type: 'LOGIN_FAILURE', payload: 'Auth entity not initialized' });
    console.error('Auth entity not initialized');
    return;
  }
  
    const loginAction = state.authEntity.actions.find(
      (action: Action) => action.name === 'create-token'
    );
  
    if (!loginAction) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login action not found' });
      console.error('Login action not found');
      return;
    }
  
    const { inputUsername: username, inputPassword: password } = state.loginState;
    console.log(username, password);
    try {
      const response = await sirenClient.submitAndParse<AuthTokens>(loginAction, {
        username,
        password
      });
  
      // If successful, retrieve and dispatch tokens
    const tokens = response.properties;
    dispatch({ type: 'LOGIN_SUCCESS', payload: tokens });
  
    sirenClient.setAccessToken(tokens.accessToken || null);
    setCookie('accessToken', tokens.accessToken!, 1);
    setCookie('refreshToken', tokens.refreshToken!, 1);
    console.log('Login successful');
    
     
  } catch (error) {
    // More granular error handling for different types of errors
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized')) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
        console.error('Invalid credentials');
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed. Please try again.' });
        console.error('Login failed with error:', error.message);
      }
    } else {
      // Fallback for any unknown errors
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An unexpected error occurred' });
      console.error('Unexpected error during login:', error);
    }
    }
  };



  /**
   * Logs the user out by clearing tokens and cookies.
   */
  const logout = () => {
   
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    sirenClient.setAccessToken(null);
    dispatch({ type: 'LOGOUT_SUCCESS' });


   
  };

  return (
    <AuthContext.Provider
      value={{
        state, dispatch
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * Provides access to authentication state and methods.
 * 
 * Must be used within AuthProvider context.
 * 
 * @example
 * ```tsx
   const { isAuthenticated, login, logout } = useAuth();

   const handleLogin = async () => {
     await login('username', 'password');
   };
 */
 
