import { useEffect, useState } from "react";
import classes from "./OrderForm.module.css";

import useInput from "../../hooks/input-hook";

const OrderForm = (props) => {
  const validateName = (value) => {
    const letters = /^[A-Za-z]+$/;
    return value.trim() != "" && value.match(letters);
  };

  const validateEmptyInput = (value) => {
    return value.trim() != "";
  };

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    classesInput: classesNameInput,
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
  }, [enteredName, enteredCity, enteredZip, enteredStreet]);

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
      props.onCancel();
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
