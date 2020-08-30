import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
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
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkOutCanceld={this.checkOutCancelHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
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
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
