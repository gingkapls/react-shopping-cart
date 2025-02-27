import { describe, expect, it } from 'vitest';
import { allItems, mockFetch, setupRoute } from './utils';
import { screen } from '@testing-library/dom';

const electronics = allItems.filter((item) => item.category === 'electronics');
globalThis.fetch = mockFetch(electronics);

describe('CategoryPage', () => {
  it('renders products of only one category', async () => {
    const { waitForLoading } = setupRoute('/products/electronics');

    await waitForLoading();

    const products = screen.getAllByLabelText('product-title');
    screen.debug();

    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      expect.stringMatching(/electronics/i),
      expect.anything()
    );

    expect(products.length).toBe(electronics.length);
    expect(products[0].textContent).toBe(electronics[0].title);
    expect(products[1].textContent).toBe(electronics[1].title);
  });
});
