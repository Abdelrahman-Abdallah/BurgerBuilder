import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tasts well!</h1>
      <div style={{ width: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={props.checkOutCanceld}>
        CANCEL
      </Button>
      <Button btnType="Success" click={props.checkOutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
