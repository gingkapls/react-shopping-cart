import App from '../App';
import ProductsPage from './ProductsPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products',
        element: <ProductsPage />,
      },
    ],
  },
];

export default routes;
