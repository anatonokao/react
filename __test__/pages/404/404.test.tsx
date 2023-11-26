import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/pages/404';

describe('tests for 404 page', () => {
  it('404 can be rendered', () => {
    render(<NotFoundPage />);
    const notFound = screen.getByRole('heading');
    expect(notFound).toHaveTextContent('404');
  });
}); 