import {
    createContext,
    useReducer,
    Dispatch,
    ReactNode,
    useCallback
    
  } from 'react'
  import { UserState, UserAction } from './userTypes'
  import { userReducer } from './userReducer'
  
 
  
  // Define the initial state
  const initialState: UserState = {
    isAuthenticated: false,
    user_id: null,
    user_name: null,
    token: null,
    message: null,
  }
  
  interface UserProviderProps {
    children: ReactNode
  }
  
  export const UserContext = createContext<{
    state: UserState
    dispatch: Dispatch<UserAction>
    login: (credentials: {
      email: string
      customer_password: string
    }) => Promise<void>
    
    register: (credentials: {
      email: string
      customer_password: string
      customer_name: string
      phone_number: string
    }) => Promise<void>
  }>({
    state: initialState,
    dispatch: () => null, // Placeholder function
    login: async () => { },
    register: async () => { },
  })
  
  export const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
  
    const login = useCallback(
      async (credentials: { email: string; customer_password: string }) => {
        try {
          const response = await fetch(
            'TheApiUrlHereForLoginEndpoint/login',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            },
          )
          const data = await response.json()
          console.log('Token data:', JSON.stringify(data.token));
          if (response.ok) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user_id: data.customer_id,
                user_name: data.customer_name,
                token: data.token,
                message: data.message,
              },
            })
          } else {
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: { error: data.message || 'Failed to login' },
            })
          }
        } catch (error: unknown) {
          let errorMessage = 'An unexpected error occurred' // A default error message
          if (error instanceof Error) {
            // Type-guard to check if error is an Error object
            errorMessage = error.message
          }
          dispatch({ type: 'LOGIN_FAILURE', payload: { error: errorMessage } })
        }
      },
      [dispatch],
    )
  
    const handleCheckCredentials = (credentials: {
      email: string
      customer_password: string
      customer_name: string
      phone_number: string
    }) => {
  
  
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        return ("Registration failed: Invalid email format.");
      }
  
  
      if (credentials.customer_password.length < 8 || credentials.customer_password.length > 20) {
        return ("Registration failed: Password must be between 8 and 20 characters long.");
      }
  
  
      if (!credentials.customer_name.trim()) {
        return ("Registration failed: Customer name cannot be empty.");
      }
  
  
      const phoneRegex = /^(?:\d{8})$/;
      if (!phoneRegex.test(credentials.phone_number)) {
        return ("Registration failed: Invalid phone number format.");
      }
  
  
      return ("Credentials are valid.");
  
  
    };
  
    const register = useCallback(
      async (credentials: {
        email: string
        customer_password: string
        customer_name: string
        phone_number: string
      }) => {
  
        const checkCredentials = handleCheckCredentials(credentials);
        if (checkCredentials === "Credentials are valid.") {
          try {
            const response = await fetch(
             'TheApiUrlHereForRegisterEndpoint/register',

              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
              },
            )
            const data = await response.json()
            if (response.ok) {
              const message = 'Registration successful'
              dispatch({ type: 'REGISTER_SUCCESS', payload: { message } })
            } else {
              dispatch({
                type: 'REGISTER_FAILURE',
                payload: { error: data.message || 'Failed to register' },
              })
            }
          } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred'  
            if (error instanceof Error) {
              // Type-guard to check if error is an Error object
              errorMessage = error.message
            }
            dispatch({ type: 'REGISTER_FAILURE', payload: { error: errorMessage } })
          }
        }
        else {
          dispatch({ type: 'REGISTER_FAILURE', payload: { error: checkCredentials } })
        }
  
      }, [dispatch]
    );
    
  
    return (
      <UserContext.Provider value={{ state, dispatch, login, register }}>
        {children}
      </UserContext.Provider>
    )
  }