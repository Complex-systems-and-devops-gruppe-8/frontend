import React, {useContext, useEffect, useState } from 'react';
import { UserContext } from '../state/userState/userContext';
import LoginPopUp from './LoginPopUp';
import '../Styling/Header.css';

 


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { state } =  useContext(UserContext);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

   const handleLogin = () => {
    console.log('login pressed');
    setLoginOpen(true);
  };
  const handleClose = () => {
    setLoginOpen(false);
  }
  
  const handleRegister = () => {
    console.log('register pressed');
  };
  const handleLogout = () => {
    console.log('logout pressed');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
   
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">🤑LOGO🤑</div>
      {loginOpen ? (  <LoginPopUp handleLogin={handleLogin} handleClose={handleClose} />) : null}
      
      <nav className="header-nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
       {/*Shows logout is auth is true and login and signup if auth is false ;) */}
      <div className='auth-buttons'>
      {state.isAuthenticated ? (
          <button className='logoutBtn' onClick={handleLogout}>Logout</button>
        ) : (
          <div className='auth-buttons'>
            <button className='loginBtn' onClick={handleLogin}>Login</button>
            <button className='registerBtn' onClick={handleRegister}>Register</button>
            </div>
        )}
        </div> 
      
    </header>
  );
};

export default Header;
