import React from "react";
import * as actionTypes from "../../store/actions";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BackDrop from "../../components/UI/Backdrop/Backdrop";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "./../../hoc/withErrorHandler/withErrorhandler";
import { connect } from "react-redux";

const INGREDIENTS_PRICES = {
  salad: 2,
  bacon: 1.5,
  cheese: 1.75,
  meat: 3,
};
class BurgerBuilder extends React.Component {
  state = {
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
    const queryParms = [];
    for (let i in this.state.ingredients) {
      queryParms.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParms.push("price=" + this.state.price);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParms.join("&"),
    });
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let ordersummary = (
      <OrderSummary
        ingredients={this.props.ings}
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
          <Burger ingredients={this.props.ings} />
        </div>
        <div>
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
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

const mapStateToProps = (state) => {
  return { ings: state.ingredients };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
    onIngredientRemoved: (name) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
