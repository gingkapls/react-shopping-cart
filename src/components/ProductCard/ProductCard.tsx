import { Dispatch, SetStateAction } from 'react';
import { Product } from '../../lib/api';
import styles from './ProductCard.module.css';

interface ProductCardProps extends Product {
  cart: Map<number, number>;
  setCart: Dispatch<SetStateAction<Map<number, number>>>;
}

function ProductCard({ id, title, image, cart, setCart }: ProductCardProps) {
  const count = cart.get(id) ?? 0;

  function changeCount(n: 1 | -1) {
    const newCart = new Map(cart);
    const newCount = Math.max(0, count + n);
    if (newCount === 0) {
      newCart.delete(id);
    } else {
      newCart.set(id, newCount);
    }
    setCart(newCart);
  }

  return (
    <div className={styles['product-card']}>
      <img src={image} alt={title} className={styles['product-image']}></img>
      <h3>{title}</h3>
      <div>
        {count === 0 ? (
          <button onClick={() => changeCount(1)}>Add to cart</button>
        ) : (
          <>
            <button onClick={() => changeCount(-1)}>-</button>
            {count}
            <button onClick={() => changeCount(1)}>+</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
