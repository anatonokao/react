import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Details from './Details';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { book } from '../../../../tests/mockData';

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));
vi.mock('react', async () => ({
  ...((await vi.importActual('react')) as object),
  useState: () => [
    {
      isLoad: true,
      book: book,
    },
    vi.fn(),
  ],
}));

describe('Details Loading', () => {
  it('Details Loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading');
    expect(loadElement).toBeInTheDocument();
  });
});
