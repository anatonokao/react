// @vitest-environment jsdom
// import userEvent from '@testing-library/user-event';
import { fireEvent, screen, render } from '@testing-library/react';
import React from 'react';
import Search from './Search';
import { AppContext } from '../../../contexts/AppContext/AppContextProvider';
describe('Search test', () => {
  it('Component rendered', () => {
    render(<Search />);
  });

  it('Input and button rendered', () => {
    render(<Search />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Request have been set', () => {
    const setRequest = vi.fn();
    const setResponse = vi.fn();
    const value = {
      request: '',
      setRequest: setRequest,
      response: {},
      setResponse: setResponse,
    };

    render(
      <AppContext.Provider value={value}>
        <Search />
      </AppContext.Provider>
    );
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.input(input, {
      target: { value: 'test' },
    });
    fireEvent.click(button);

    expect(setRequest).toHaveBeenCalledWith('test');
  });
});
