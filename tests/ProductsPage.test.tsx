import { describe, expect, it } from 'vitest';
import { allItems, mockFetch, setupRoute } from './utils';
import { Category } from '../src/lib/api';
import { screen } from '@testing-library/dom';

// Mocking our requests
globalThis.fetch = mockFetch(allItems);

describe('ProductsPage', () => {
  it('renders loading text on start', () => {
    setupRoute('/products');
    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });

  it('renders categories eventually', async () => {
    const { waitForLoading } = setupRoute('/products');

    const categories: Category[] = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ];

    await waitForLoading();

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renders products eventually', async () => {
    const { waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const products = screen.getAllByLabelText('product-title');

    expect(products.length).toBe(allItems.length);

    expect(products[0].textContent).toBe(allItems[0].title);
    expect(products[1].textContent).toBe(allItems[1].title);
    expect(products[2].textContent).toBe(allItems[2].title);
  });
});
