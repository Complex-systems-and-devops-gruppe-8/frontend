 

export type UserState = {
  isAuthenticated: boolean
  user_id: number | null
  user_name: string | null
  token: string | null
  message: String | null
 

}

export type UserAction =
  | {
    type: 'LOGIN_SUCCESS'
    payload: {
      user_id: number
      user_name: string
      token: string
      message: string
    }
  }
  | { type: 'LOGIN_FAILURE'; payload: { error: String } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: { message: String } }
  | { type: 'REGISTER_FAILURE'; payload: { error: String } }
  | { type: 'SET_USER_STATE'; payload: { userState: UserState } }