import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends React.Component {
  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkOutContinueHandler = () => {
    this.props.history.push(`${this.props.match.path}/contact-data`);
  };
  render() {
    let checkout_summary = <Redirect to="/" />;
    if (this.props.ings) {
      checkout_summary = (
        <CheckoutSummary
          ingredients={this.props.ings}
          checkOutCanceld={this.checkOutCancelHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
      );
    }
    return (
      <div>
        {checkout_summary}
        {/* <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        /> */}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
