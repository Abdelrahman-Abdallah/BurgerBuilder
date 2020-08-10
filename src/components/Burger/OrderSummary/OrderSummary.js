import React from "react";
import Aux from "../../../hoc/Auxiliary";
import "./OrderSummary.css";
const OrderSummary = (props) => {
  const ingredeintsSummary = Object.keys(props.ingredients).map((key, i) => (
    <li key={key + i}>
      <span className="IngredientName">{key}</span> : {props.ingredients[key]}
    </li>
  ));
  return (
    <Aux>
      <h3>your Orders</h3>
      <p>A declicious burget with the following Ingredients</p>
      <ul>{ingredeintsSummary}</ul>
      <p>Continue to checkout ?</p>
    </Aux>
  );
};

export default OrderSummary;
