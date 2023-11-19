import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import App from '../../../App';
import { userEvent } from '@testing-library/user-event';
import { response } from '../../../../tests/mockData';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store/store';
import { bookAPI } from '../../../services/BookService';

let mockParams = 'page=1';
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useSearchParams: () => {
    const [params, setParams] = useState(
      new URLSearchParams('page=' + Number(mockParams.at(5)))
    );
    return [
      params,
      (newParams: string) => {
        mockParams = newParams;
        setParams(new URLSearchParams('page=' + Number(newParams.at(5))));
      },
    ];
  },
}));

describe('Pagination', () => {
  it('Pagination component updates URL query parameter when page changes', async () => {
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

    let PaginationNext = await screen.findByTestId('PaginationNext');

    await userEvent.click(PaginationNext);
    expect(mockParams).toEqual('page=2');

    PaginationNext = await screen.findByTestId('PaginationNext');
    await userEvent.click(PaginationNext);
    expect(mockParams).toEqual('page=3');

    let PaginationPrev = await screen.findByTestId('PaginationPrev');
    await userEvent.click(PaginationPrev);
    expect(mockParams).toEqual('page=2');

    PaginationPrev = await screen.findByTestId('PaginationPrev');
    await userEvent.click(PaginationPrev);
    expect(mockParams).toEqual('page=1');
  });
});
