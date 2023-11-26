import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Details from './Details';
import React, { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { book, response } from '../../../../tests/mockData';
import App from '../../../App';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store/store';
import { bookAPI } from '../../../services/BookService';

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
  it('Detailed card component correctly displays the detailed card data', async () => {
    const spyApi = vi.spyOn(bookAPI, 'useFetchBookSearchQuery');
    spyApi.mockReturnValue({ refetch: vi.fn(), data: response });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const card = (await screen.findAllByTestId('book-item'))[0];

    const spyApiDetails = vi.spyOn(bookAPI, 'useFetchBookDetailsQuery');
    spyApiDetails.mockReturnValue({ refetch: vi.fn(), data: book });

    await userEvent.click(card);
    const details = await screen.findByTestId('details');

    const detailsImg = await screen.findByTestId('img');

    expect(detailsImg).toHaveAttribute(
      'src',
      book.volumeInfo.imageLinks.thumbnail
    );
    expect(details).toHaveTextContent(book.volumeInfo.title);
    expect(details).toHaveTextContent(book.volumeInfo.authors[0]);
    expect(details).toHaveTextContent(book.saleInfo.listPrice.amount + '');
    expect(details).toHaveTextContent(book.saleInfo.listPrice.currencyCode);
  });
});

describe('Details click test', () => {
  it('Click on a card opens a detailed card component', async () => {
    const spyApi = vi.spyOn(bookAPI, 'useFetchBookSearchQuery');
    spyApi.mockReturnValue({ refetch: vi.fn(), data: response });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const card = (await screen.findAllByTestId('book-item'))[0];

    const spyApiDetails = vi.spyOn(bookAPI, 'useFetchBookDetailsQuery');
    spyApiDetails.mockReturnValue({ refetch: vi.fn(), data: book });

    await userEvent.click(card);
    const details = await screen.findByTestId('details');
    expect(details).toBeInTheDocument();
  });

  it('Click on a card triggers an additional API call to fetch detailed information', async () => {
    const spyApiDetails = vi.spyOn(bookAPI, 'useFetchBookDetailsQuery');
    spyApiDetails.mockReturnValue({ refetch: vi.fn(), data: book });

    render(
      <MemoryRouter initialEntries={['/details/jLKyhJGLgjGlkHgf']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    expect(spyApiDetails).toHaveBeenCalledTimes(2);
  });

  it('Click on the close button hides the details component', async () => {
    const spyApiDetails = vi.spyOn(bookAPI, 'useFetchBookDetailsQuery');
    spyApiDetails.mockReturnValue({ refetch: vi.fn(), data: book });

    render(
      <MemoryRouter initialEntries={['/details/GJhiHbHkG']}>
        <Provider store={setupStore()}>
          <Routes>
            <Route path="details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const closeBtn = await screen.findByTestId('close-details-btn');

    await userEvent.click(closeBtn);

    expect(closeBtn).not.toBeInTheDocument();
  });
});
