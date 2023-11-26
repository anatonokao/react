import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }),
}));

describe('Error Button', () => {
  it('Error button throw error', async () => {
    render(<Header />);
    const ErrorBtn = screen.getByTestId('ErrorBtn');

    expect(() => fireEvent.click(ErrorBtn)).toThrowError("I'm crashed!");
  });
});
