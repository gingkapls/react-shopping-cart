import { describe, expect, it, vi } from 'vitest';
import { allItems, setupRoute } from './utils';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';

const electronics = allItems.filter((item) => item.category === 'electronics');
globalThis.fetch = vi
  .fn()
  .mockResolvedValue({ ok: true, json: () => Promise.resolve(electronics) });

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
