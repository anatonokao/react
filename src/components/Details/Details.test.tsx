import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Details from './Details';
import React, { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { book, response } from '../../../tests/mockData';
import { AppContextProvider } from '../../contexts/AppContext/AppContextProvider';
import App from '../../App';
import { userEvent } from '@testing-library/user-event';

let mockParams = { page: '1' };
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
  useSearchParams: () => {
    const [params, setParams] = useState(
      new URLSearchParams('page=' + mockParams.page)
    );
    return [
      params,
      (newParams: { page: string }) => {
        mockParams = newParams;
        setParams(new URLSearchParams('page=' + newParams.page));
      },
    ];
  },
}));

describe('Details click test', () => {
  it('Click on a card opens a detailed card component', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(response),
    });
    global.fetch = vi.fn().mockImplementationOnce(() => mockFetch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );
    const card = await (await screen.findAllByTestId('book-item'))[0];

    const mockFetchBook = Promise.resolve({
      json: () => Promise.resolve(book),
    });
    global.fetch = vi.fn().mockImplementationOnce(() => mockFetchBook);

    await userEvent.click(card);
    const details = await screen.findByTestId('details');
    expect(details).not.toBeInTheDocument();
  });

  it('Click on a card triggers an additional API call to fetch detailed information', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(book),
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);
    const spy = vi.spyOn(global, 'fetch');
    render(
      <MemoryRouter initialEntries={['/details/jLKyhJGLgjGlkHgf']}>
        <AppContextProvider>
          <Routes>
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Click on the close button hides the details component', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(book),
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);
    render(
      <MemoryRouter initialEntries={['/details/GJhiHbHkG']}>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );

    const closeBtn = await screen.findByTestId('close-details-btn');

    await userEvent.click(closeBtn);

    expect(closeBtn).not.toBeInTheDocument();
  });
});
