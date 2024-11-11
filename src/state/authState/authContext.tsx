import React, { createContext,  useEffect, Dispatch,useReducer, useRef    } from 'react';
import { useNavigate } from 'react-router-dom';
import { sirenClient } from '../../api/sirenClient';
import { Action } from '@siren-js/client';
import { AuthState, AuthAction  } from './authTypes'
import { authReducer  } from './userReducer'
import { AuthTokens } from './authTypes';
 import { RefreshedAccessToken } from './authTypes'; 



const initialState: AuthState = {
  authTokens: { accessToken: null, refreshToken: null },
  isAuthenticated: false,
  rootEntity: null,
  authEntity: null,
  loginState: {
    startLogIn: false,
    error: null,
    loggedIn: false,
    inputEmail: '',
    inputPassword: ''
  }

};

const AuthContext = createContext<
{
  state: AuthState
  dispatch: Dispatch<AuthAction>,
}>({
  state: initialState,
  dispatch: () => null, // Placeholder function
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
 // const [accessToken, setAccessToken] = useState<string | null>(null);
 // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  //const [rootEntity, setRootEntity] = useState<any>(null);
  //const [authEntity, setAuthEntity] = useState<any>(null);
  const navigate = useNavigate();

  /**
   * Initializes the authentication system by fetching root and auth entities.
   * Runs once when the component mounts.
   */
  useEffect(() => {
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
    };
    init();
  }, []);

  const tokenRef = useRef<{ accessToken: string | null; refreshToken: string | null }>({
    accessToken: null,
    refreshToken: null
  });

  /**
   * Updates the token reference and Siren client when tokens change.
   * Ensures the latest token values are available for the refresh mechanism.
   */
  useEffect(() => {
    tokenRef.current = {
      accessToken: state.authTokens.accessToken,
      refreshToken: state.authTokens.refreshToken
    };
    sirenClient.setAccessToken(state.authTokens?.accessToken || null);
  }, [state.authTokens]);


  /**
   * Cheks if the user is trying to login
   */
  useEffect(() => {
    if (state.loginState.startLogIn) {
      login();
    }
  }, [state.loginState.startLogIn, navigate]);


  /**
   * Automatic token refresh mechanism.
   * Refreshes the access token every 270 seconds if auth entity is available.
   * Redirects to login page if refresh fails.
   */
  useEffect(() => {
    let refreshTimer: number;

    const refreshAccessToken = async () => {
      // Use the ref to get current token values
      const { accessToken, refreshToken } = tokenRef.current;

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
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: tokens.accessToken });
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
        navigate('/login');
      }
    };

    if (state.authEntity) {
      refreshTimer = window.setInterval(refreshAccessToken, 270000);
    }

    return () => {
      if (refreshTimer) {
        window.clearInterval(refreshTimer);
      }
    };
  }, [state.authEntity, navigate]);


  const login = async () => {
    if (!state.authEntity) throw new Error('Auth entity not initialized');
  
    const loginAction = state.authEntity.actions.find(
      (action: Action) => action.name === 'create-token'
    );
  
    if (!loginAction) throw new Error('Login action not found');
  
    const { inputEmail: username, inputPassword: password } = state.loginState;
  
    try {
      const response = await sirenClient.submitAndParse<AuthTokens>(loginAction, {
        username,
        password
      });
  
      const tokens = response.properties;
      dispatch({ type: 'LOGIN_SUCCESS', payload: tokens });
    
     
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
         dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
      throw error;
    }
  };
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    sirenClient.setAccessToken(null);
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
 
