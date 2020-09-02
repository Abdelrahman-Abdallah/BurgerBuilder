import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/withErrorHandler/withErrorhandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Orders extends React.Component {
  state = {
    orders: null,
    loading: true,
  };
  componentDidMount() {
    this.props.fetchOrders();
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithError(Orders, axios));
