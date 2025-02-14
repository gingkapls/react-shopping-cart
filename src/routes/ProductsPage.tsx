import ProductList from '../components/ProductList/ProductList';
import useData from '../hooks/useData';
import { Product, QueryBuilder } from '../lib/api';
import { useCart } from '../App';

function ProductsPage() {
  const query = new QueryBuilder()
    .type('products')
    .sort('asc')
    .limit(0)
    .build();

  const { data, isLoading } = useData<Product[]>(query);
  const { cart, setCart } = useCart();

  if (isLoading || !data) return 'loading...';
  return <ProductList products={data} cart={cart} setCart={setCart}/>;
}

export default ProductsPage;
