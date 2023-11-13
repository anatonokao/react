import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Header from './Header';

describe('Main component', () => {
  it('check render', () => {
    render(<Header />);
  });
});
