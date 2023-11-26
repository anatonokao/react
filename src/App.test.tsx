import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import App from './App';
import NotFoundPage from '../pages/404';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { bookAPI } from './services/BookService';

describe('404', () => {
  it('404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/fjkfjgl']}>
        <Routes>
          <Route path="/">
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const NotFound = screen.getByTestId('NotFoundPage');

    expect(NotFound).toBeInTheDocument();
  });
});

describe('Nothing found', () => {
  it('Nothing found is displayed if no cards are present', async () => {
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
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={
                <Provider store={setupStore()}>
                  <App />
                </Provider>
              }
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const nothingFound = await screen.findByTestId('nothing-found');

    expect(nothingFound).toBeInTheDocument();
  });
});
