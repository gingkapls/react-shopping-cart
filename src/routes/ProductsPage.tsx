import { Link, Outlet, useParams } from 'react-router';
import ProductList from '../components/ProductList/ProductList';
import useData from '../hooks/useData';
import { Category, Product, QueryBuilder } from '../lib/api';
import { useCart } from '../hooks/contexts';

function ProductsPage() {
  const query = new QueryBuilder()
    .type('products')
    .sort('asc')
    .limit(0)
    .build();

  const categories: Category[] = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  const { category } = useParams();

  const { data, isLoading } = useData<Product[]>(query);
  const { cart, setCart } = useCart();

  if (isLoading || !data) return 'loading...';
  return (
    <div className='product-page'>
      <nav>
        {categories.map((category) => (
          <Link key={category} to={category}>
            {category}
          </Link>
        ))}
      </nav>
      {category ? (
        <Outlet context={{ cart, setCart }} />
      ) : (
        <ProductList products={data} cart={cart} setCart={setCart} />
      )}
    </div>
  );
}

export default ProductsPage;
