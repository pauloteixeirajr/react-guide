import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    const updatedAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
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
