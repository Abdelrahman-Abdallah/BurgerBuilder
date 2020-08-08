import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {
  //we have ingredient HERE as prop
  let transformedIngredients = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])]
        .map((_, i) => {
          return (
            <BurgerIngredient
              key={`${ingredientKey}+${i}`}
              type={ingredientKey}
            ></BurgerIngredient>
          );
        })
        .reduce((arr, ele) => {
          console.log(ele);
          return arr.concat(ele);
        }, []);
    }
  );
  if (transformedIngredients.length === 0) {
    transformedIngredients = "<p>Please Start Adding ingredients</p>";
  }
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
