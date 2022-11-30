import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o App de Receitas, pagina do Profile', () => {
  test('Se esta renderizando corretamente a pagina do profile ', () => {
    renderWithRouter(<Profile />);

    const buttonDone = screen.getByRole('button', { name: /Done Recipes/i });
    const buttonFavorite = screen.getByRole('button', { name: /Favorite Recipes/i });
    const buttonLogout = screen.getByRole('button', { name: /Logout/i });

    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });
});
