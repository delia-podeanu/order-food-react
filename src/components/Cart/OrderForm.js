import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./OrderForm.module.css";

import useInput from "../../hooks/input-hook";

const OrderForm = (props) => {
  const cartCtx = useContext(CartContext);

  const clearCart = () => cartCtx.clearCart();

  const validateName = (value) => {
    let errorMessage = null;
    const letters = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      errorMessage = "The input should not be empty.";
    }
    if (!value.match(letters)) {
      errorMessage = "The input should contain just letters.";
    }
    const hasError = value.trim() !== "" && value.match(letters);
    return { errorMessage, hasError };
  };

  const validateEmptyInput = (value) => {
    let errorMessage = null;
    const hasError = value.trim() !== "";
    if (value.trim() === "") {
      errorMessage = "The input should not be empty.";
    }
    return { errorMessage, hasError };
  };

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    classesInput: classesNameInput,
    errorMessage: errorMessageName,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(validateName, {
    invalid: classes.invalid,
    control: classes.control,
  });

  const {
    value: enteredStreet,
    hasError: streetInputHasError,
    isValid: enteredStreetIsValid,
    errorMessage: errorMessageStreet,
    classesInput: classesStreetInput,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(validateEmptyInput, {
    invalid: classes.invalid,
    control: classes.control,
  });

  const {
    value: enteredZip,
    hasError: zipInputHasError,
    isValid: enteredZipIsValid,
    errorMessage: errorMessageZip,
    classesInput: classesZipInput,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipInputBlurHandler,
  } = useInput(validateEmptyInput, {
    invalid: classes.invalid,
    control: classes.control,
  });

  const {
    value: enteredCity,
    hasError: cityInputHasError,
    isValid: enteredCityIsValid,
    errorMessage: errorMessageCity,
    classesInput: classesCityInput,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(validateEmptyInput, {
    invalid: classes.invalid,
    control: classes.control,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (
      enteredZipIsValid &&
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    enteredZipIsValid,
    enteredNameIsValid,
    enteredCityIsValid,
    enteredStreetIsValid,
  ]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    try {
      const response = await fetch(
        "https://meals-project-45e41-default-rtdb.firebaseio.com/oders.json",
        {
          method: "POST",
          body: JSON.stringify({
            name: enteredName,
            street: enteredStreet,
            zip: enteredZip,
            city: enteredCity,
            items: props.items,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      props.onCancel();
      clearCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form}>
      <div className={classesNameInput}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <div className={classes["error-message"]}>* {errorMessageName}</div>
        )}
      </div>
      <div className={classesStreetInput}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputHasError && (
          <div className={classes["error-message"]}>* {errorMessageStreet}</div>
        )}
      </div>
      <div className={classesZipInput}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredZip}
          onChange={zipChangeHandler}
          onBlur={zipInputBlurHandler}
        />
        {zipInputHasError && (
          <div className={classes["error-message"]}>* {errorMessageZip}</div>
        )}
      </div>
      <div className={classesCityInput}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputHasError && (
          <div className={classes["error-message"]}>* {errorMessageCity}</div>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={classes.submit}
          onClick={onSubmitHandler}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
