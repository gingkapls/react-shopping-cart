import { useState } from 'react';
import './App.css';
import { Link, Outlet } from 'react-router';
import { cart, cartItem } from './routes/CartPage';
import './App.css';

function App() {
  const [cart, setCart] = useState<cart>(new Map<number, cartItem>());
  const numCartItems = [...cart.values()].length;

  return (
    <>
      <nav className='main-nav'>
        <Link to='/'>Home</Link>
        <Link to='products'>Products</Link>
        <Link to='cart'>Cart [{numCartItems}]</Link>
      </nav>
      <Outlet context={{ cart, setCart }} />
    </>
  );
}

export default App;
