import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../src/components/LoginForm';

describe('LoginForm', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  test('el botón está deshabilitado al iniciar', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(loginButton).toBeDisabled();
    expect(loginButton).toHaveClass('disabled');
  });

  test('el botón se habilita solo cuando los tres campos están completos', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    expect(loginButton).toBeDisabled();

    fireEvent.change(clientCodeInput, { target: { value: '12345' } });
    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'usuario1' } });
    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(loginButton).toBeEnabled();
    expect(loginButton).toHaveClass('enabled');
  });

  test('el botón se deshabilita si se vacía algún campo', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(clientCodeInput, { target: { value: '12345' } });
    fireEvent.change(usernameInput, { target: { value: 'usuario1' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: '' } });
    expect(loginButton).toBeDisabled();
  });

  test('el botón se deshabilita con espacios en blanco únicamente', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(clientCodeInput, { target: { value: '   ' } });
    fireEvent.change(usernameInput, { target: { value: 'usuario1' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(loginButton).toBeDisabled();
  });

  test('al hacer clic en el botón habilitado se llama a la función Login con los valores correctos', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(clientCodeInput, { target: { value: '12345' } });
    fireEvent.change(usernameInput, { target: { value: 'usuario1' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith({
      clientCode: '12345',
      username: 'usuario1',
      password: 'password123'
    });
  });

  test('la función Login se llama con valores sin espacios al inicio y final', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(clientCodeInput, { target: { value: '  12345  ' } });
    fireEvent.change(usernameInput, { target: { value: '  usuario1  ' } });
    fireEvent.change(passwordInput, { target: { value: '  password123  ' } });

    fireEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalledWith({
      clientCode: '12345',
      username: 'usuario1',
      password: 'password123'
    });
  });

  test('no se llama a la función Login si no se proporciona onLogin', () => {
    render(<LoginForm />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(clientCodeInput, { target: { value: '12345' } });
    fireEvent.change(usernameInput, { target: { value: 'usuario1' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(() => fireEvent.click(loginButton)).not.toThrow();
  });

  test('el formulario contiene todos los campos requeridos', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    expect(screen.getByLabelText(/código de cliente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('los campos tienen los tipos correctos', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    
    const clientCodeInput = screen.getByLabelText(/código de cliente/i);
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(clientCodeInput).toHaveAttribute('type', 'text');
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});