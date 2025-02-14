import { useState } from 'react';
import './App.css';
import { Link, Outlet } from 'react-router';
import { cart, cartItem } from './routes/CartPage';
import { Category } from './lib/api';

function App() {
  const [cart, setCart] = useState<cart>(new Map<number, cartItem>());
  const numCartItems = [...cart.values()].length;

  const categories: Category[] = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='products'>Products</Link>
        {categories.map((category) => (
          <Link key={category} to={category}>
            {category}
          </Link>
        ))}
        <Link to='cart'>Cart {numCartItems}</Link>
      </nav>
      <Outlet context={{ cart, setCart }} />
    </>
  );
}

export default App;
