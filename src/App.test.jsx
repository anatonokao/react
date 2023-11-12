import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import { afterEach, describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from './contexts/AppContext/AppContextProvider';

describe('Main component', () => {
  afterEach(() => {
    cleanup();
  });

  it('App component rendered', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

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

    await render(
      <MemoryRouter>
        <AppContext.Provider value={value}>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // const notFoundText = screen.findByTestId('nothing-found');

    await expect(
      await screen.findByTestId('nothing-found')
    ).toBeInTheDocument();
  });
});
