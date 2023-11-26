import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Pagination from '@/components/SearchingResults/Pagination/Pagination';

const mockPush = jest.fn();

mockPush.mockImplementation((query) => {
  mockRouter.query = { ...query.query };
});

const mockRouter = {
  query: { page: 1, countPerPage: 20 },
  push: mockPush,
};
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('Pagination', () => {
  it('Pagination component updates URL query parameter when page changes', async () => {
    render(<Pagination />);
    const PaginationNext = await screen.findByTestId('PaginationNext');
    const PaginationPrev = await screen.findByTestId('PaginationPrev');

    await userEvent.click(PaginationNext);
    expect(mockRouter.query.page).toBe(2);

    await userEvent.click(PaginationNext);
    expect(mockRouter.query.page).toBe(3);

    await userEvent.click(PaginationPrev);
    expect(mockRouter.query.page).toBe(2);

    await userEvent.click(PaginationPrev);
    expect(mockRouter.query.page).toBe(1);
  });

  it('Pagination component updates URL query parameter when count items per page changes', async () => {
    render(<Pagination />);
    const paginationSelect = await screen.findByTestId('pagination-select');
    const paginationOption10 = await screen.findByTestId(
      'pagination-select-option-10'
    );
    const paginationOption30 = await screen.findByTestId(
      'pagination-select-option-30'
    );

    await userEvent.selectOptions(paginationSelect, [paginationOption10]);
    expect(mockRouter.query.countPerPage).toBe('10');

    await userEvent.selectOptions(paginationSelect, [paginationOption30]);
    expect(mockRouter.query.countPerPage).toBe('30');
  });
});
