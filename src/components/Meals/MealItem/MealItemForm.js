import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountValid, setAmountValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmound = +amountInputRef.current.value;
    if (enteredAmound < 1 || enteredAmound > 5) {
      setAmountValid(false);
      return;
    }
    props.onAddToCart(enteredAmound);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
