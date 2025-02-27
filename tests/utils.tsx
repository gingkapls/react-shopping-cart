import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from '../src/routes/routes';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { cartItem } from '../src/routes/CartPage';

const allItems = [
  {
    id: 1,
    title: 'Laptop',
    description: 'This is a laptop',
    image: 'imageUrl',
    price: 12.5,
    category: 'electronics',
    count: 1,
  },
  {
    id: 2,
    title: 'Toy',
    description: 'This is a toy',
    image: 'imageUrl',
    price: 12.5,
    category: 'electronics',
    count: 2,
  },
  {
    id: 3,
    title: 'Shirt',
    description: 'This is a shirt',
    image: 'imageUrl',
    price: 12.5,
    category: "men's clothing",
    count: 5,
  },
] satisfies cartItem[];

function setupRoute(route: string) {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
}

export { allItems, setupRoute };
