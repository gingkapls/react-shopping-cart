import App from '../App';
import { CartPage } from './CartPage';
import CategoryPage from './CategoryPage';
import ProductsPage from './ProductsPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products',
        element: <ProductsPage />,
        children: [
          {
            path: ':category',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
];

export default routes;
