import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/withErrorHandler/withErrorhandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Orders extends React.Component {
  state = {
    orders: null,
    loading: true,
  };
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = null;
    if (this.props.orders) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }

    return (
      <div>
        {this.props.isAuthenticated ? null : <Redirect />}
        {this.props.loading ? <Spinner /> : null}
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithError(Orders, axios));
