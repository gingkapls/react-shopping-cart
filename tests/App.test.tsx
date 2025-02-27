import { describe, expect, it } from 'vitest';
import { allItems, mockFetch, setupRoute } from './utils';
import { screen } from '@testing-library/dom';

globalThis.fetch = mockFetch(allItems);

describe('App', () => {
  it('adds a product to cart', async () => {
    const { user, waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const buttons = screen.getAllByRole('button', {
      name: /add to cart/i,
    });

    // Adding to cart
    await user.click(buttons[0]);

    const cartLink = screen.getByRole('link', { name: /cart.*/i });

    // navigating to cart

    await user.click(cartLink);

    const cartProducts = screen.getAllByLabelText('product');

    expect(cartProducts.length).toBe(1);
  });

  it('adds multiple copies of a product to cart', async () => {
    const { user, waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const buttons = screen.getAllByRole('button', {
      name: /add to cart/i,
    });

    // Adding to cart
    await user.click(buttons[0]);

    const cartLink = screen.getByRole('link', { name: /cart 1/i });

    // navigating to cart
    await user.click(cartLink);

    const incrementBtn = screen.getByRole('button', { name: /increment/i });
    const counter = screen.getByRole<HTMLInputElement>('spinbutton');

    await user.click(incrementBtn);
    expect(counter.value).toBe('2');
  });

  it('adds multiple products to cart', async () => {
    const { user, waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const buttons = screen.getAllByRole('button', {
      name: /add to cart/i,
    });

    // Adding to cart
    await user.click(buttons[0]);
    await user.click(buttons[1]);

    const cartLink = screen.getByRole('link', { name: /cart 2/i });

    // navigating to cart
    await user.click(cartLink);

    const cartProducts = screen.getAllByLabelText('product');

    // Calculates total properly
    const totalPrice = screen.getByText(/total.*25/i);
    expect(totalPrice).toBeInTheDocument();

    expect(cartProducts.length).toBe(2);
  });

  it('can reduce copies of a cart item', async () => {
    const { user, waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const buttons = screen.getAllByRole('button', {
      name: /add to cart/i,
    });

    // Adding to cart
    await user.click(buttons[0]);

    const cartLink = screen.getByRole('link', { name: /cart 1/i });

    // navigating to cart
    await user.click(cartLink);

    const incrementBtn = screen.getByRole('button', { name: /increment/i });
    const decrementBtn = screen.getByRole('button', { name: /decrement/i });
    const counter = screen.getByRole<HTMLInputElement>('spinbutton');

    // Increasing
    await user.click(incrementBtn);
    expect(counter.value).toBe('2');

    // Decreasing
    await user.click(decrementBtn);
    expect(counter.value).toBe('1');
  });

  it('removes item from cart', async () => {
    const { user, waitForLoading } = setupRoute('/products');

    await waitForLoading();

    const buttons = screen.getAllByRole('button', {
      name: /add to cart/i,
    });

    // Adding to cart
    await user.click(buttons[0]);

    const cartLink = screen.getByRole('link', { name: /cart 1/i });

    // navigating to cart
    await user.click(cartLink);

    const decrementBtn = screen.getByRole('button', { name: /decrement/i });
    const counter = screen.getByRole<HTMLInputElement>('spinbutton');

    // Decreasing
    await user.click(decrementBtn);
    
    const products = screen.queryAllByLabelText('product');

    expect(counter).not.toBeInTheDocument();
    expect(products.length).toBe(0);
  });
});
