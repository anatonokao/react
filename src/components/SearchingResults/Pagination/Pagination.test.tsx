import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppContextProvider } from '../../../contexts/AppContext/AppContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import App from '../../../App';
import { userEvent } from '@testing-library/user-event';
import { response } from '../../../../tests/mockData';

let mockParams = { page: '1' };
vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
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

describe('Pagination', () => {
  it('Pagination component updates URL query parameter when page changes', async () => {
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

    let PaginationNext = await screen.findByTestId('PaginationNext');
    await userEvent.click(PaginationNext);
    expect(mockParams).toEqual({ page: '2' });

    PaginationNext = await screen.findByTestId('PaginationNext');
    await userEvent.click(PaginationNext);
    expect(mockParams).toEqual({ page: '3' });

    let PaginationPrev = await screen.findByTestId('PaginationPrev');
    await userEvent.click(PaginationPrev);
    expect(mockParams).toEqual({ page: '2' });

    PaginationPrev = await screen.findByTestId('PaginationPrev');
    await userEvent.click(PaginationPrev);
    expect(mockParams).toEqual({ page: '1' });
  });
});
