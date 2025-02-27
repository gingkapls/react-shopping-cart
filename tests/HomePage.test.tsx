import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setupRoute } from './utils';

describe('Home route', () => {
  it('renders home', () => {
    setupRoute('/');
    expect(screen.queryByText(/welcome to my store/i)).toBeInTheDocument();
  });
});
