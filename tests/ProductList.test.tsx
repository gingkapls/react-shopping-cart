import { describe, expect, it, vi } from 'vitest';
import { cartItem } from '../src/routes/CartPage';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ProductList from '../src/components/ProductList/ProductList';
import { allItems } from './utils';

function setupProductList(itemCount: number) {
  // Only render itemCount items
  const items = allItems.slice(0, Math.min(itemCount, 3));

  const cart = new Map<number, cartItem>();
  const setCart = vi.fn();

  items.forEach((item) => {
    cart.set(item.id, item);
  });

  return {
    user: userEvent.setup(),
    cart,
    setCart,
    items,
    ...render(<ProductList cart={cart} setCart={setCart} products={items} />),
  };
}

describe('ProductList', () => {
  it('renders no products if there are not any', () => {
    setupProductList(0);

    const products = screen.queryAllByLabelText('product-title');
    expect(products.length).toBe(0);
  });

  it('renders a single product', () => {
    const { items } = setupProductList(1);

    const products = screen.queryAllByLabelText('product-title');

    expect(products.length).toBe(1);
    expect(products[0].textContent).toBe(items[0].title);
  });

  it('renders multiple products', () => {
    const { items } = setupProductList(3);

    const products = screen.queryAllByLabelText('product-title');

    expect(products.length).toBe(3);
    expect(products[0].textContent).toBe(items[0].title);
    expect(products[1].textContent).toBe(items[1].title);
    expect(products[2].textContent).toBe(items[2].title);
  });
});
