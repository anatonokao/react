import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { book } from '../../tests/mockData';
import Home from '@/pages/index';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }),
}));

describe('Nothing Found test', () => {
  it('Check render Home', () => {
    render(
      <Home
        data={{ kind: '', totalItems: 0, items: [] }}
        isError={false}
        details={book}
      />
    );
  });

  it('Appropriate message is displayed if no cards are present', async () => {
    render(
      <Home
        data={{ kind: '', totalItems: 0, items: [] }}
        isError={false}
        details={book}
      />
    );

    const nothingFound = await screen.findByTestId('nothing-found');

    expect(nothingFound).toBeInTheDocument();
  });

  it('If getServerSideProps returned isError true throwing error', () => {
    const renderWithError = () => {
      render(
        <Home
          data={{ kind: '', totalItems: 0, items: [] }}
          isError={true}
          details={book}
        />
      );
    };
    expect(renderWithError).toThrowError("I'm crashed!");
  });
});

