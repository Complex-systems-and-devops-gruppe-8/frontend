import React, { createContext, useContext, useEffect, Dispatch,useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sirenClient } from '../../api/sirenClient';
import { Action } from '@siren-js/client';
import { AuthState, AuthAction  } from './authTypes'
import { authReducer  } from './userReducer'
  
const initialState: AuthState = {
  authTokens: null,
  isAuthenticated: false,
  login: async () => { },
  logout: () => { },
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [rootEntity, setRootEntity] = useState<any>(null);
  const [authEntity, setAuthEntity] = useState<any>(null);
  const navigate = useNavigate();

  /**
   * Initializes the authentication system by fetching root and auth entities.
   * Runs once when the component mounts.
   */
  useEffect(() => {
    const init = async () => {
      try {
        const root = await sirenClient.followAndParse('/');
        setRootEntity(root);

        const authLink = root.links.find((link: any) => link.rel.includes('auth'));
        if (authLink) {
          const auth = await sirenClient.followAndParse(authLink.href);
          setAuthEntity(auth);
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
    tokenRef.current = { accessToken, refreshToken };
    sirenClient.setAccessToken(accessToken);
  }, [accessToken, refreshToken]);

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

      if (!authEntity || !accessToken || !refreshToken) {
        console.log('Missing required data for refresh');
        return;
      }

      try {
        const refreshAction = authEntity.actions.find(
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
        setAccessToken(tokens.accessToken);
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
        navigate('/login');
      }
    };

    if (authEntity) {
      refreshTimer = window.setInterval(refreshAccessToken, 270000);
    }

    return () => {
      if (refreshTimer) {
        window.clearInterval(refreshTimer);
      }
    };
  }, [authEntity, navigate]);


  const login = async (username: string, password: string) => {
    if (!authEntity) throw new Error('Auth entity not initialized');

    const loginAction = authEntity.actions.find(
      (action: Action) => action.name === 'create-token'
    );

    if (!loginAction) throw new Error('Login action not found');

    try {
      const response = await sirenClient.submitAndParse<AuthTokens>(loginAction, {
        username,
        password
      });

      const tokens = response.properties;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        navigate('/login');
      }
      throw error;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    sirenClient.setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
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
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
