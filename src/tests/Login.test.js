import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('', () => {
  test('', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
  });
});
