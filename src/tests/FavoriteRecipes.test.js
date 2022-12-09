import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

const favoriteRecipes = '/favorite-recipes';
const emailInput = 'email-input';
const passwordInput = 'password-input';
const emailLiteral = 'test@trybe.com';

jest.spyOn(navigator.clipboard, 'writeText');

describe('testes da página de favoritos', () => {
  test('se a receita favorita e copia o link da página de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailLiteral);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    const corba = await screen.findAllByAltText('imagem da receita');
    userEvent.click(corba[0]);
    const btnStart = await screen.findByRole('button', { name: 'Start Recipe' });
    userEvent.click(btnStart);
    const btnFavorite = await screen.findByAltText('btn-favorite');
    expect(btnFavorite).toBeInTheDocument();
    userEvent.click(btnFavorite);
    history.push(favoriteRecipes);
    expect(history.location.pathname).toEqual(favoriteRecipes);
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
  test('testa se ao clicar na imagem da comida a página é redirecionada', async () => {
    const object = [{ id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', alcoholicOrNot: '' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailLiteral);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push(favoriteRecipes);
    const image = await screen.findByTestId('button-food');
    const favorite = screen.getByText('Favorites');
    expect(favorite).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    fireEvent.click(image);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });
  test('testa se ao clicar no nome da comida a página é redirecionada', async () => {
    const object = [{ id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', alcoholicOrNot: '' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailLiteral);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push(favoriteRecipes);
    const image = await screen.findByTestId('button-name-food');
    const favorite = screen.getByText('Favorites');
    expect(favorite).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    fireEvent.click(image);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });
  test('testa se ao clicar na imagem do drink a página é redirecionada', async () => {
    const object = [{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', alcoholicOrNot: 'Optional alcohol' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailLiteral);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push('/favorite-recipes');
    const image = await screen.findByTestId('button-drink');
    const favorite = screen.getByText('Favorites');
    expect(favorite).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    fireEvent.click(image);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));
  });
  test('testa se ao clicar na imagem do drink a página é redirecionada', async () => {
    const object = [{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', alcoholicOrNot: 'Optional alcohol' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailLiteral);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push(favoriteRecipes);
    const image = await screen.findByTestId('button-name-drink');
    const favorite = screen.getByText('Favorites');
    expect(favorite).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    fireEvent.click(image);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));
  });
});
