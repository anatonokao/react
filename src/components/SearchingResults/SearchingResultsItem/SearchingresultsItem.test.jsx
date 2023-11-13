import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import SearchingResultsItem from './SearchingResultsItem';
import { book } from '../../../../tests/mockData';
describe('Main component', () => {
  const item = book;
  it('check render', () => {
    render(<SearchingResultsItem item={item} />);
  });
});
