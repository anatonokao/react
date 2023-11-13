import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Details from './Details';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { book } from '../../../tests/mockData';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));
vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
  useState: () => [
    {
      isLoad: false,
      book: book,
    },
    vi.fn(),
  ],
}));

describe('Details component', () => {
  it('Details component rendered', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const details = screen.getByTestId('details');
    expect(details).toBeInTheDocument();
  });

  it('Detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const title = screen.getByText(book.volumeInfo.title);
    const description = screen.getByText(book.volumeInfo.description);
    const img = screen.getByTestId('img');
    const buyLink = screen.getByTestId('buyLink');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(img).toHaveAttribute('src', book.volumeInfo.imageLinks.thumbnail);
    expect(buyLink).toHaveAttribute('href', book.saleInfo.buyLink);
  });
});
