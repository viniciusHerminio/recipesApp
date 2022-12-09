import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

const favoriteRecipes = '/favorite-recipes';

jest.spyOn(navigator.clipboard, 'writeText');

describe('testes da página de favoritos', () => {
  test('se a receita favorita e copia o link da página de detalhes', async () => {
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
    history.push(favoriteRecipes);
    expect(history.location.pathname).toEqual(favoriteRecipes);
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  });
  /*  test('se ao clicar na imagem ou nome é redirecionado para a página de detalhes', async () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
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
    const checkboxLentils = await screen.findByTestId('Lentils');
    userEvent.click(checkboxLentils);
    const checkboxOnion = await screen.findByTestId('Onion');
    userEvent.click(checkboxOnion);
    const checkboxCarrots = await screen.findByTestId('Carrots');
    userEvent.click(checkboxCarrots);
    const checkboxTomatoPuree = await screen.findByTestId('Tomato Puree');
    userEvent.click(checkboxTomatoPuree);
    const checkboxCumin = await screen.findByTestId('Cumin');
    userEvent.click(checkboxCumin);
    const checkboxPaprika = await screen.findByTestId('Paprika');
    userEvent.click(checkboxPaprika);
    const checkboxMint = await screen.findByTestId('Mint');
    userEvent.click(checkboxMint);
    const checkboxThyme = await screen.findByTestId('Thyme');
    userEvent.click(checkboxThyme);
    const checkboxBlackPepper = await screen.findByTestId('Black Pepper');
    userEvent.click(checkboxBlackPepper);
    const checkboxRedPepperFlakes = await screen.findByTestId('Red Pepper Flakes');
    userEvent.click(checkboxRedPepperFlakes);
    const checkboxVegetableStock = await screen.findByTestId('Vegetable Stock');
    userEvent.click(checkboxVegetableStock);
    const checkboxWater = await screen.findByTestId('Water');
    userEvent.click(checkboxWater);
    const checkboxSeaSalt = await screen.findByTestId('Sea Salt');
    userEvent.click(checkboxSeaSalt);
    const finish = screen.getByRole('button', { name: 'FINISH' });
    userEvent.click(finish);
    const profile = await screen.findByTestId('profile-top-btn');
    userEvent.click(profile);
    const favoritePag = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favoritePag);
    waitForElementToBeRemoved(favoritePag);
    await screen.findByText('Favorites');
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    await screen.findByTestId('0-horizontal-name');
    expect(screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/drinks/15997');
  }); */
  test('testa se ao clicar na imagem da comida a página é redirecionada', async () => {
    const object = [{ id: '52977', type: 'meal', nationality: 'Turkish', category: 'Side', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', alcoholicOrNot: '' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push('/favorite-recipes');
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
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push('/favorite-recipes');
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
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'test@trybe.com');
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
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    history.push('/favorite-recipes');
    const image = await screen.findByTestId('button-name-drink');
    const favorite = screen.getByText('Favorites');
    expect(favorite).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    fireEvent.click(image);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));
  });
});
