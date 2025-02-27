import { useParams } from 'react-router';
import ProductList from '../components/ProductList/ProductList';
import useData from '../hooks/useData';
import { Category, Product, QueryBuilder } from '../lib/api';
import { useCart } from '../hooks/contexts';

function CategoryPage() {
  const { category = 'electronics' } = useParams() as { category: Category };
  const query = new QueryBuilder().type('category').category(category).build();

  const { data, error, isLoading } = useData<Product[]>(query);
  const { cart, setCart } = useCart();

  if (error && error instanceof Error) {
    console.error(error);
    return 'Ran into an error' + error.message;
  }

  if (!data || isLoading) return 'Loading...';

  return (
    <div className='category'>
      <ProductList products={data} cart={cart} setCart={setCart} />
    </div>
  );
}

export default CategoryPage;
