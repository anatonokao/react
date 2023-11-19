import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Details from './Details';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { setupStore } from '../../../store/store';
import { Provider } from 'react-redux';

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual('react-router-dom')) as object),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));

describe('Details Loading', () => {
  it('Details Loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <Details />
        </Provider>
      </MemoryRouter>
    );
    const loadElement = screen.getByAltText('loading');
    expect(loadElement).toBeInTheDocument();
  });
});
