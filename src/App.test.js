import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FinTrust login form', () => {
  render(<App />);
  const titleElement = screen.getByText(/FinTrust - Iniciar Sesión/i);
  expect(titleElement).toBeInTheDocument();
});
