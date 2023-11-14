import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AppContextProvider } from './contexts/AppContext/AppContextProvider';
import App from './App';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { response } from '../tests/mockData';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';

describe('404', () => {
  it('404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/fjkfjgl']}>
        <AppContextProvider>
          <Routes>
            <Route path="/">
              <Route path="/" element={<App />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );

    const NotFound = screen.getByTestId('NotFoundPage');

    expect(NotFound).toBeInTheDocument();
  });
});

describe('404', () => {
  it('Nothing found is displayed if no cards are present', async () => {
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
