import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AppContextProvider } from './contexts/AppContext/AppContextProvider';
import App from './App';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';

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
