import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from './contexts/AppContext/AppContextProvider';

vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useEffect: vi.fn(),
}));

describe('Main component', () => {
  it('Nothing found is displayed if no cards are present', async () => {
    const value = {
      request: 'book',
      setRequest: vi.fn(),
      response: {
        kind: 'books#volumes',
        totalItems: 0,
        items: [],
      },
      setResponse: vi.fn(),
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={value}>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const notFoundText = await screen.findByTestId('nothing-found');
    await expect(notFoundText).toBeInTheDocument();
  });
});
