import { Dispatch, SetStateAction } from 'react';
import { Product } from '../../lib/api';
import ProductCard from '../ProductCard/ProductCard';
import { cart } from '../../routes/CartPage';

interface ProductListProps {
  products: Product[];
  cart: cart;
  setCart: Dispatch<SetStateAction<cart>>;
}

function ProductList({ products, cart, setCart }: ProductListProps) {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setCart={setCart}
          cart={cart}
        />
      ))}
    </div>
  );
}

export default ProductList;
