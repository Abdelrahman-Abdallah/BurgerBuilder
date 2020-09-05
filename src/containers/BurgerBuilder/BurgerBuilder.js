import React from "react";
import * as actionTypes from "../../store/actions/index";
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
class BurgerBuilder extends React.Component {
  state = {
    purchable: false,
    ordering: false,
    loading: false,
  };
  componentDidMount() {
    this.props.initIngredient();
    this.props.purchaseInit();
  }
  updatePurchaseState = () => {
    const ingredients = { ...this.props.ings };
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  orderingHandler = () => {
    const ordering = this.state.ordering;
    this.setState({ ordering: !ordering });
  };
  orderContinueHandler = () => {
    if (!this.props.isAuthenticated) return this.props.history.push("/auth");
    this.props.history.push("/checkout");
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
            price={this.props.price}
            purchable={this.updatePurchaseState()}
            order={this.orderingHandler}
          />
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (name) => dispatch(actionTypes.addIngredient(name)),
    onIngredientRemoved: (name) => dispatch(actionTypes.removeIngredient(name)),
    purchaseInit: () => dispatch(actionTypes.orderPurchasedInit()),
    initIngredient: () => dispatch(actionTypes.initIngredient()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
