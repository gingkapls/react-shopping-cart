import { Dispatch, SetStateAction } from 'react';
import { Product } from '../../lib/api';
import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
  cart: Map<number, number>;
  setCart: Dispatch<SetStateAction<Map<number, number>>>;
}

function ProductList({ products, cart, setCart }: ProductListProps) {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          setCart={setCart}
          cart={cart}
        />
      ))}
    </div>
  );
}

export default ProductList;
