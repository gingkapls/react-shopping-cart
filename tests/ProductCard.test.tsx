import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ProductCard from '../src/components/ProductCard/ProductCard';
import { Product } from '../src/lib/api';
import { cartItem } from '../src/routes/CartPage';

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const mockItem = {
  id: 1,
  title: 'Laptop',
  description: 'This is a laptop',
  image: 'imageUrl',
  price: 12.5,
  category: 'electronics',
  count: 0,
} satisfies cartItem;

describe('Product Card Component', () => {
  it('displays product details when its not in cart', () => {
    const cart = new Map<number, cartItem>();
    const setCart = vi.fn();

    setup(<ProductCard product={mockItem} cart={cart} setCart={setCart} />);
    
    const image = screen.getByRole<HTMLImageElement>('img');
    expect(image.src).toMatch(mockItem.image);
    expect(image.alt).toMatch(mockItem.title);

    expect(screen.getByRole('heading').textContent).toMatch(mockItem.title);

    const priceText = screen.getByText('Price ' + '$' + mockItem.price);
    expect(priceText).toBeInTheDocument();

    const buttonAdd = screen.getByRole('button', { name: /Add to Cart/i });
    const buttonIncrement = screen.queryByRole('button', { name: /increment/i });
    const buttonDecrement = screen.queryByRole('button', { name: /decrement/i });

    expect(buttonAdd).toBeInTheDocument();
    expect(buttonIncrement).not.toBeInTheDocument();
    expect(buttonDecrement).not.toBeInTheDocument();
  });

  it('displays product details and relevant buttons when its in cart', () => {
    const cart = new Map<number, cartItem>();
    cart.set(1, { ...mockItem, count: 1 });
    const setCart = vi.fn();

    setup(<ProductCard product={mockItem} cart={cart} setCart={setCart} />);

    expect(screen.getByRole('heading').textContent).toMatch(mockItem.title);

    const priceText = screen.getByText('Price ' + '$' + mockItem.price);
    expect(priceText).toBeInTheDocument();

    const buttonAdd = screen.queryByRole('button', { name: /add to cart/i });
    expect(buttonAdd).not.toBeInTheDocument();
    
    const buttonIncrement = screen.getByRole('button', { name: /increment/i });
    const buttonDecrement = screen.getByRole('button', { name: /decrement/i });
    expect(buttonIncrement).toBeInTheDocument();
    expect(buttonDecrement).toBeInTheDocument();
  });
});
