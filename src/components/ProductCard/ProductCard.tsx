import { Dispatch, SetStateAction } from 'react';
import { Product } from '../../lib/api';
import styles from './ProductCard.module.css';
import { cart } from '../../routes/CartPage';

interface ProductCardProps {
  product: Product;
  cart: cart;
  setCart: Dispatch<SetStateAction<cart>>;
}

function ProductCard({ product, cart, setCart }: ProductCardProps) {
  const { id, title, image, price } = product;

  // product doesn't exist in our cart
  const count = cart.get(id)?.count ?? 0;

  function changeCount(n: number) {
    // Handle malformed input
    if (Number.isNaN(n)) return;

    const newCart = new Map(cart);
    const newCount = Math.max(0, n);
    if (newCount === 0) {
      newCart.delete(id);
    } else {
      newCart.set(id, { ...product, count: newCount });
    }
    setCart(newCart);
  }

  return (
    <div className={styles['product-card']} aria-label='product'>
      <img src={image} alt={title} className={styles['product-image']}></img>
      <h3 aria-label='product-title' className={styles['product-title']} title={title} >
        {title}
      </h3>
      <div>
        {count === 0 ? (
          <button onClick={() => changeCount(count + 1)}>Add to cart</button>
        ) : (
          <>
            <button
              onClick={() => changeCount(count - 1)}
              aria-label='decrement'
            >
              -
            </button>
            <input
              type='number'
              min={0}
              onChange={(e) => changeCount(parseInt(e.target.value))}
              value={count}
            />
            <button
              onClick={() => changeCount(count + 1)}
              aria-label='increment'
            >
              +
            </button>
          </>
        )}
      </div>
      <span className='price'>Price ${price}</span>
    </div>
  );
}

export default ProductCard;
