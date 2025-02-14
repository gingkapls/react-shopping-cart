import { Dispatch, SetStateAction, useState } from 'react';
import './App.css';
import { Link, Outlet, useOutletContext } from 'react-router';
import { Product } from './lib/api';

type cart = Map<number, number>;

interface ContextType {
  cart: cart;
  setCart: Dispatch<SetStateAction<cart>>;
}

function App() {
  const [cart, setCart] = useState<cart>(new Map<number, number>());

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='products'>Products</Link>
      </nav>
      <Outlet context={{ cart, setCart }} />
    </>
  );
}

export function useCart() {
  return useOutletContext<ContextType>();
}

export default App;
