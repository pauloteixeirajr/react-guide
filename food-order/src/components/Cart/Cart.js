import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = ({ onHideCart }) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = cartCtx.items.map(item => (
    <CartItem
      key={item.id}
      amount={item.amount}
      price={item.price}
      name={item.name}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  return (
    <Modal onHideCart={onHideCart}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={onHideCart} />}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
