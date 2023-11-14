import { screen, render } from '@testing-library/react';
import React from 'react';
import SearchingResults from './SearchingResults';
import { AppContextProvider } from '../../contexts/AppContext/AppContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { expect, vi, describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { response } from '../../../tests/mockData';
import App from '../../App';

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));

describe('Searching results test', () => {
  it('SearchingResults component rendered', () => {
    render(
      <MemoryRouter>
        <SearchingResults
          countPerPage={10}
          currentPage={1}
          updateCountPerPage={vi.fn()}
          updatePage={vi.fn()}
        />
      </MemoryRouter>
    );
  });

  it('Component renders the specified number of cards', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(response),
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );
    const bookItem = await screen.findAllByTestId('book-item');
    expect(bookItem.length).toBe(2);
  });
});

describe('Nothing Found test', () => {
  it('Appropriate message is displayed if no cards are present', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(response),
    });
    global.fetch = vi.fn().mockImplementationOnce(() => mockFetch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContextProvider>
          <Routes>
            <Route path="/">
              <Route path="/" element={<App />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );

    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');

    const mockFetchNothing = Promise.resolve({
      json: () =>
        Promise.resolve({
          kind: '',
          totalItems: 0,
          items: [],
        }),
    });
    global.fetch = vi.fn().mockImplementationOnce(() => mockFetchNothing);

    await userEvent.type(input, 'rtiuopwpetoiioweurtwoeirtwiopeurt');
    await userEvent.click(button);

    const nothingFound = await screen.findByTestId('nothing-found');

    expect(nothingFound).toBeInTheDocument();
  });
});
