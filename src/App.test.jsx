import { render } from '@testing-library/react';
import App from './App';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Main component', () => {
  it('App component rendered', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
