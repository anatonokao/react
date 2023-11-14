import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { userEvent } from '@testing-library/user-event';
import { AppContextProvider } from '../../contexts/AppContext/AppContextProvider';
import App from '../../App';
import { response } from '../../../tests/mockData';

describe('Error Button', () => {
  it.fails('Error button throw error', async () => {
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

    const ErrorBtn = await screen.findByTestId('ErrorBtn');
    expect(await userEvent.click(ErrorBtn)).toThrowError();
  });
});
