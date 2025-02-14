import { Dispatch, SetStateAction } from 'react';
import { cart } from '../routes/CartPage';
import { useOutletContext } from 'react-router';

export interface CartContext {
  cart: cart;
  setCart: Dispatch<SetStateAction<cart>>;
}

export function useCart() {
  return useOutletContext<CartContext>();
}
