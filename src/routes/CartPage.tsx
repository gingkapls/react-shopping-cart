import ProductCard from '../components/ProductCard/ProductCard';
import { Product } from '../lib/api';
import { useCart } from '../hooks/contexts';

export interface cartItem extends Product {
  count: number;
}
export type cart = Map<number, cartItem>;

export function CartPage() {
  const { cart, setCart } = useCart();
  const cartItems = [...cart.values()];
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.price * cur.count, 0);

  if (cartItems.length === 0) return 'No items in cart';

  return (
    <div className='cart'>
      {cartItems.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setCart={setCart}
          cart={cart}
        />
      ))}
      <p>Total: ${totalPrice}</p>
    </div>
  );
}
