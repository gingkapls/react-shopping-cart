import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import routes from '../src/routes/routes';

function setupHome() {
  const [home] = routes;
  const router = createMemoryRouter([home]);
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
}

describe('Home route', () => {
  it('renders home', () => {
    setupHome();
    expect(screen.queryByText(/welcome to my store/i)).toBeInTheDocument();
  });
});
