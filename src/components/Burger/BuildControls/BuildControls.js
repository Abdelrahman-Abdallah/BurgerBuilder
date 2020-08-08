import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Burger price:<strong> {props.price} $</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            label={control.label}
            type={control.type}
            key={control.label}
            add={() => props.addIngredient(control.type)}
            remove={() => props.removeIngredient(control.type)}
            disabled={props.disabled[control.type]}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;
