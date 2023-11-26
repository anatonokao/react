import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchingResultsItem from './SearchingResultsItem';
import { book } from '../../../../tests/mockData';

describe('Main component', () => {
  const item = book;

  it('check render', () => {
    render(<SearchingResultsItem item={item} />);
    expect(screen.getByTestId('SearchingResultsItem')).toBeInTheDocument();
  });

  it('Chard component renders the relevant card data', () => {
    render(<SearchingResultsItem item={item} />);

    const bookItem = screen.getByTestId('SearchingResultsItem');
    const img = screen.getByAltText('thumbnail');

    expect(img).toHaveAttribute('src', book.volumeInfo.imageLinks.thumbnail);
    expect(bookItem).toHaveTextContent(book.volumeInfo.title);
    expect(bookItem).toHaveTextContent(book.volumeInfo.authors[0]);
    expect(bookItem).toHaveTextContent(book.saleInfo.listPrice.amount + '');
    expect(bookItem).toHaveTextContent(book.saleInfo.listPrice.currencyCode);
  });
});
