import "../Styling/LoginPopUp.css";
import "../state/authState/authContext";
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../state/authState/authContext';

interface LoginPopUpProps {
    handleClose: () => void;
}

function LoginPopUp({ handleClose }: LoginPopUpProps) {
    const { state, dispatch } = useContext(AuthContext);
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Email and password validators
    /*
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };*/

    const validateUsername = (username: string) => {
        if (username.length < 4 || username.length > 29) {
            setUsernameError('Username must be between 3 and 30 characters');
        } else {
            setUsernameError('');
        }
    };

    const validatePassword = (password: string) => {
        if (password.length < 8 || password.length > 50) {
            setPasswordError('Password must be between 8 and 50 characters');
        } else {
            setPasswordError('');
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            dispatch({ type: 'LOGIN_START', payload: { username, password } });
        }
    };
    const onClose = () => {
      dispatch({ type: 'LOGOUT' });
        handleClose();
    };

    useEffect(() => {
        // Check if form is valid
        setIsFormValid(!usernameError && !passwordError && username !== '' && password !== '');
    }, [usernameError, passwordError, username, password]);

    useEffect(() => {
        if (state.loginState.loggedIn) {
            handleClose();
        }
    }, [state.loginState.loggedIn]);

    return (
        <div className="overlay">
            <div className="login-popup">
                <form onSubmit={onSubmit}>
                    <button className="close-btn" onClick={onClose}>X</button>
                    
                    <label htmlFor="username">Username:</label>
                    <input
                        className="input"
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            validateUsername(e.target.value);
                        }}
                    />
                    {usernameError && <div className="error">{usernameError}</div>}
                    
                    <label htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                    
                    <button className="submitBtn" type="submit" disabled={!isFormValid}>Login</button>

                    {state.loginState.error && <div className="error">{state.loginState.error}</div>}
                </form>
            </div>
        </div>
    );
}

export default LoginPopUp;
