import { useState } from "react";

const useInput = (validateValue, classesName) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateReturn = validateValue(enteredValue);
  const valueIsValid = validateReturn.hasError;
  const errorMessage = validateReturn.errorMessage;
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const errorClass = hasError ? `${classesName.invalid}` : "";

  const classesInput = `${classesName.control} ${errorClass}`;
  return {
    value: enteredValue,
    hasError,
    errorMessage,
    isValid: valueIsValid,
    classesInput,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
