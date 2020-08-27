import React from "react";
import classes from "./Order.module.css";
const Order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad (1) {JSON.stringify(props.ingredients)}</p>
      <p>
        Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
