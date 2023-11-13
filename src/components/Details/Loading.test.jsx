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
      isLoad: true,
      book: book,
    },
    vi.fn(),
  ],
}));

describe('Loaded work', () => {
  it('Loading work', async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading');
    expect(loadElement).toBeInTheDocument();
  });
});
