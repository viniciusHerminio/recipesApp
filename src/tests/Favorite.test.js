import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

jest.spyOn(navigator.clipboard, 'writeText');

describe('testes da página de favoritos', () => {
  test('se o header se encontra na página de favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    const corba = await screen.findAllByAltText('imagem da receita');
    userEvent.click(corba[0]);
    const btnStart = await screen.findByRole('button', { name: 'Start Recipe' });
    userEvent.click(btnStart);
    const btnFavorite = await screen.findByAltText('btn-favorite');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    history.push('/favorite-recipes');
    expect(history.location.pathname).toEqual('/favorite-recipes');
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
});
