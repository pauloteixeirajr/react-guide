import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';

import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnAnimation, setBtnAnimation] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((total, cur) => {
    return total + cur.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`;

  useEffect(() => {
    if (!cartCtx.items.length) return;
    setBtnAnimation(true);
    const timeout = setTimeout(() => setBtnAnimation(false), 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [cartCtx.items]);

  return (
    <button className={buttonClasses} {...props}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
