import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    const updatedItems = [...state.items, action.item];
    const updatedAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === 'REMOVE_CART_ITEM') {
    return {
      ...state,
    };
  }
  return defaultCartState;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD_CART_ITEM', item });
  };

  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
