import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import "./OrderSummary.css";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log("[OrderSummary Will Update]");
  }

  ingredeintsSummary = Object.keys(this.props.ingredients).map((key, i) => (
    <li key={key + i}>
      <span className="IngredientName">{key}</span> :{" "}
      {this.props.ingredients[key]}
    </li>
  ));
  render() {
    return (
      <Aux>
        <h3>your Orders</h3>
        <p>A declicious burget with the following Ingredients</p>
        <ul>{this.ingredeintsSummary}</ul>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" click={this.props.hide}>
          CANCEL
        </Button>
        <Button btnType="Success" click={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
