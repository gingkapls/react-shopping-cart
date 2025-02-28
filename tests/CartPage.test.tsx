import { describe, expect, it } from 'vitest';
import { setupRoute } from './utils';
import { screen } from '@testing-library/dom';

describe('CartPage', () => {
  it('renders no item text', () => {
    setupRoute('/cart');
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
    expect(screen.getByText(/cart \[0\]/i)).toBeInTheDocument();
  });
});
