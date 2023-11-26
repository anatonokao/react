import { render, screen } from '@testing-library/react';
import SearchingResultsItem from '@/components/SearchingResults/SearchingResultsItem/SearchingResultsItem';
import { book } from '../../../../tests/mockData';

describe('Main component', () => {
  it('check render', () => {
    render(<SearchingResultsItem item={book} />);
    expect(screen.getByTestId('SearchingResultsItem')).toBeInTheDocument();
  });

  it('Card component renders the relevant card data', () => {
    render(<SearchingResultsItem item={book} />);

    const bookItem = screen.getByTestId('SearchingResultsItem');
    const img = screen.getByAltText('thumbnail');

    expect(img).toHaveAttribute('src', book.volumeInfo.imageLinks.thumbnail);
    expect(bookItem).toHaveTextContent(book.volumeInfo.title);
    expect(bookItem).toHaveTextContent(book.volumeInfo.authors[0]);
    expect(bookItem).toHaveTextContent(book.saleInfo.listPrice.amount + '');
    expect(bookItem).toHaveTextContent(book.saleInfo.listPrice.currencyCode);
  });
});
