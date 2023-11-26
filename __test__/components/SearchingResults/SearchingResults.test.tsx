import { screen, render } from '@testing-library/react';
import { response } from '../../../tests/mockData';
import SearchingResults from '@/components/SearchingResults/SearchingResults';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: {} }),
}));

describe('Searching results test', () => {
  it('SearchingResults component rendered', () => {
    render(
      <SearchingResults data={response.items} detailsData={response.items[0]} />
    );
  });

  it('Component renders the specified number of cards', async () => {
    render(
      <SearchingResults data={response.items} detailsData={response.items[0]} />
    );
    const bookItem = await screen.findAllByTestId('book-item');
    expect(bookItem.length).toBe(3);
  });
});
