import { useState } from "react";
import classes from "./OrderForm.module.css";

const OrderForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    zip: "",
    city: "",
  });

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleStreetChange = (e) => {
    setFormData({ ...formData, street: e.target.value });
  };
  const handleZipChange = (e) => {
    setFormData({ ...formData, zip: e.target.value });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://meals-project-45e41-default-rtdb.firebaseio.com/oders.json",
        {
          method: "POST",
          body: JSON.stringify({ ...formData, items: props.items }),
        }
      );
      const data = await response.json();
      props.onCancel();
      setFormData({
        name: "",
        street: "",
        zip: "",
        city: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleNameChange}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={formData.street}
          onChange={handleStreetChange}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={formData.zip}
          onChange={handleZipChange}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={handleCityChange}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={onSubmitHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
