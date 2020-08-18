import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BackDrop from "../../components/UI/Backdrop/Backdrop";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "./../../hoc/withErrorHandler/withErrorhandler";
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
    ordering: false,
    loading: false,
  };
  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((key) => {
        // console.log(key, " ", ingredients[key]);
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
  orderingHandler = () => {
    console.log(`purchsing`);
    const ordering = this.state.ordering;
    this.setState({ ordering: !ordering });
  };
  orderContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Abdelrahman",
        email: "test@test.com",
        address: "test Address",
      },
      delvieryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, ordering: false });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, ordering: false });
      });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let ordersummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        hide={this.orderingHandler}
        continue={this.orderContinueHandler}
      />
    );
    if (this.state.loading) {
      ordersummary = <Spinner />;
    }
    return (
      <Aux>
        <BackDrop
          show={this.state.ordering}
          hide={this.orderingHandler}
        ></BackDrop>
        <Modal show={this.state.ordering}>{ordersummary}</Modal>
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
            order={this.orderingHandler}
          />
        </div>
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
