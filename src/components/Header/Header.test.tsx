import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { userEvent } from '@testing-library/user-event';
import Header from './Header';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

describe('Error Button', () => {
  it.fails('Error button throw error', async () => {
    render(
      <MemoryRouter>
        <Provider store={setupStore()}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    const ErrorBtn = await screen.findByTestId('ErrorBtn');
    expect(await userEvent.click(ErrorBtn)).toThrowError();
  });
});
