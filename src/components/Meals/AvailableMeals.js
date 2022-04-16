import { useCallback, useState, useEffect } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/http-hook";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const dataTransform = (data) => {
    let items = [];
    for (let index in data) {
      items.push({
        id: index,
        ...data[index],
      });
    }

    setMeals(items);
  };

  const { isLoading, error, sendRequest } = useHttp(
    {
      url: "https://meals-project-45e41-default-rtdb.firebaseio.com/Meals.json",
    },
    dataTransform
  );

  const fetchMeals = useCallback(async () => {
    sendRequest();
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  let content = <p>No meals found.</p>;

  if (meals.length > 0) {
    console.log(meals);
    content = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
