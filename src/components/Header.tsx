import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../state/userState/userContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styling/Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { state } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    console.log('login pressed');
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
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

      <nav className="header-nav">
        <ul>
          <li><a href="#home">Home</a></li>
        </ul>
      </nav>
      {/* Shows logout if authenticated and login and signup if not authenticated */}
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
