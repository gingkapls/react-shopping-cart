import { describe, expect, it, vi } from 'vitest';
import { allItems, setupRoute } from './utils';
import { Category } from '../src/lib/api';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';

// Mocking our requests
globalThis.fetch = vi
  .fn()
  .mockResolvedValue({ ok: true, json: () => Promise.resolve(allItems)});

describe('ProductsPage', () => {
  it('renders loading text on start', () => {
    setupRoute('/products');
    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });

  it('renders categories eventually', async () => {
    setupRoute('/products');

    const categories: Category[] = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing",
    ];

    const loading = () => screen.queryByText(/loading/i);
    await waitForElementToBeRemoved(loading);

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });
  
  it('renders products eventually', async () => {
    setupRoute('/products');

    const loading = () => screen.queryByText(/loading/i);
    await waitForElementToBeRemoved(loading);
    
    const products = screen.getAllByLabelText('product-title');
    
    expect(products.length).toBe(allItems.length);

    expect(products[0].textContent).toBe(allItems[0].title)
    expect(products[1].textContent).toBe(allItems[1].title)
    expect(products[2].textContent).toBe(allItems[2].title)
    
  })
});
