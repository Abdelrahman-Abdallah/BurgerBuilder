import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
class Checkout extends React.Component {
  state = {
    ingredients: null,
    price: 0,
  };
  componentWillMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
        continue;
      }
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients, price: price });
  }
  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkOutContinueHandler = () => {
    this.props.history.push(`${this.props.match.path}/contact-data`);
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkOutCanceld={this.checkOutCancelHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
        {/* <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        /> */}
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
