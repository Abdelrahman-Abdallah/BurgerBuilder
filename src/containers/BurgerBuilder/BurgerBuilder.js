import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENTS_PRICES = {
  salad: 2,
  bacon: 1.5,
  cheese: 1.75,
  meat: 3,
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: 4,
    purchable: false,
  };
  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((key) => {
        console.log(key, " ", ingredients[key]);
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
    //console.log(sum);
    this.setState({ purchable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    console.log(`add ingredient`);
    const oldCount = this.state.ingredients[type];
    const newIngredient = {
      ...this.state.ingredients,
    };
    newIngredient[type] = oldCount + 1;

    this.setState(
      {
        ingredients: newIngredient,
        price: this.state.price + INGREDIENTS_PRICES[type],
      },
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = (type) => {
    console.log(`remove Ingredient`);
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) return;
    const newIngredient = {
      ...this.state.ingredients,
    };
    newIngredient[type] = oldCount - 1;
    this.setState(
      {
        ingredients: newIngredient,
        price: this.state.price - INGREDIENTS_PRICES[type],
      },
      this.updatePurchaseState
    );
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div>
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.price}
            purchable={this.state.purchable}
          />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
