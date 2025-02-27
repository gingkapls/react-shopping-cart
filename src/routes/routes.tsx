import { RouteObject } from 'react-router';
import App from '../App';
import { CartPage } from './CartPage';
import CategoryPage from './CategoryPage';
import ProductsPage from './ProductsPage';
import Home from './Home';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
] satisfies RouteObject[];

export default routes;
