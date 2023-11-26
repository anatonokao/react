import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Search from '../../../../components/Header/Search/Search';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ query: {}, push: mockPush }),
}));

describe('Search test', () => {
  it('Input and button rendered', () => {
    render(<Search />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Click on the Search button change query params', async () => {
    render(<Search />);

    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');

    await userEvent.type(input, 'test');
    await userEvent.click(button);
    expect(mockPush).toBeCalledWith({ query: { page: 1, q: 'test' } });
  });
});
