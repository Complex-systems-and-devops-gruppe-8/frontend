// src/test/RegisterPage.test.tsx
//import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../Pages/RegisterPage';

describe('RegisterPage Component', () => {
  it('shows an error message if passwords do not match', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'differentpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));


    // Check for the error message
    expect(screen.queryByText('Passwords do not match.')).not.toBeNull();
  });

  it('shows an error message if emails do not match', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Email'), { target: { value: 'different@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));


    // Check for the error message
    expect(screen.queryByText('Emails do not match.')).not.toBeNull();
  });

  it('shows an error message if any field is empty', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Check for the error message
    expect(screen.queryByText('All fields are required.')).not.toBeNull();
  });

  it('does not show an error message if all fields are valid', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));


    // Check that no error message is displayed
    expect(screen.queryByText('All fields are required.')).toBeNull();
    expect(screen.queryByText('Emails do not match.')).toBeNull();
    expect(screen.queryByText('Passwords do not match.')).toBeNull();
  });
});