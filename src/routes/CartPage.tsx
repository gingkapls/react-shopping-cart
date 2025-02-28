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
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0
  );

  if (cartItems.length === 0) return 'No items in cart';

  return (
    <div className='cart'>
      <div className='cart-items'>
        {cartItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setCart={setCart}
            cart={cart}
          />
        ))}
      </div>
      <div className='checkout-actions'>
        <span className='price'>Total: ${totalPrice.toFixed(2)}</span>
        <button type='button'>Pay now</button>
      </div>
    </div>
  );
}
