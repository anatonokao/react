import { screen, render } from '@testing-library/react';
import React from 'react';
import SearchingResults from './SearchingResults';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, vi, describe, it } from 'vitest';
import { response } from '../../../tests/mockData';
import App from '../../App';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { bookAPI } from '../../services/BookService';

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));

describe('Searching results test', () => {
  it('SearchingResults component rendered', () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <SearchingResults data={response.items} />
        </Provider>
      </MemoryRouter>
    );
  });

  it('Component renders the specified number of cards', async () => {
    const spyApi = vi.spyOn(bookAPI, 'useFetchBookSearchQuery');
    spyApi.mockReturnValue({ refetch: vi.fn(), data: response });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const bookItem = await screen.findAllByTestId('book-item');
    expect(bookItem.length).toBe(3);
  });
});

describe('Nothing Found test', () => {
  it('Appropriate message is displayed if no cards are present', async () => {
    const spyApi = vi.spyOn(bookAPI, 'useFetchBookSearchQuery');
    spyApi.mockReturnValue({
      refetch: vi.fn(),
      data: {
        kind: '',
        totalItems: 0,
        items: [],
      },
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="/">
              <Route path="/" element={<App />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const nothingFound = await screen.findByTestId('nothing-found');

    expect(nothingFound).toBeInTheDocument();
  });
});
