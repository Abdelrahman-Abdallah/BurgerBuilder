import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {
  //we have ingredient HERE as prop
  const transformedIngredients = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient
            key={`${ingredientKey}+${i}`}
            type={ingredientKey}
          ></BurgerIngredient>
        );
      });
    }
  );
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
