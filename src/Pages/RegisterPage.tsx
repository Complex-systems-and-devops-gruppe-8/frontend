import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styling/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { username, email, confirmEmail, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmEmail || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (email !== confirmEmail) {
      setError('Emails do not match.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Registered User:', formData);
    setError('');

  };


  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page

  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      
      <p onClick={handleGoBack} className="go-back-text">Go Back</p>

      {error && <p className="error-message">{error}</p>} {/* Error message styling applied */}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="confirmEmail"
          placeholder="Repeat Email"
          value={formData.confirmEmail}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
