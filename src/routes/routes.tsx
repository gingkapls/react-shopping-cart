import App from '../App';
import { CartPage } from './CartPage';
import CategoryPage from './CategoryPage';
import ProductsPage from './ProductsPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProductsPage /> },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: ':category',
        element: <CategoryPage />,
      },

      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
];

export default routes;
