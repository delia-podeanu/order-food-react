import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButtons.module.css";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  const noCartItems = cartCtx.items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsAnimated(true);

    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
