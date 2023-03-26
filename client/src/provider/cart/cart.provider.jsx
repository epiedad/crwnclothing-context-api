import React, { createContext, useState, useEffect } from 'react';

import {
  addItemsToCart,
  removeItemsToCart,
  clearItemsFromCart,
  cartItemsCountFromCart,
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItemsCount: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItem = (item) => setCartItems(addItemsToCart(cartItems, item));
  const removeItem = (item) => setCartItems(removeItemsToCart(cartItems, item));
  const clearItem = (item) => setCartItems(clearItemsFromCart(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);
  
  useEffect(() => {
    setCartItemsCount(cartItemsCountFromCart(cartItems));
  },[cartItems])

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItem,
        cartItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
