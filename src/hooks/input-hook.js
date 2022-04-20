import { useState } from "react";

const useInput = (validateValue, classesName) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
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
    isValid: valueIsValid,
    classesInput,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
