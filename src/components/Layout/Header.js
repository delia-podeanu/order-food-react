import { Fragment } from "react";

import mealsImg from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food" />
      </div>
    </Fragment>
  );
};

export default Header;
