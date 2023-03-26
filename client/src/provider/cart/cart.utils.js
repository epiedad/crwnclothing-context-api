export const addItemsToCart = (cartItems, itemToAdd) => {
  const isItemExist = cartItems.find((item) => item.id === itemToAdd.id);

  if (isItemExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const clearItemsFromCart = (cartItems, itemToClear) => {
  const isItemExist = cartItems.find((item) => item.id === itemToClear.id);

  if (isItemExist) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
  }
  return cartItems;
};

export const removeItemsToCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const cartItemsCountFromCart = (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  );
