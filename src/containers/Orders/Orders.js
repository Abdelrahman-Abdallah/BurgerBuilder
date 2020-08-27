import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithError from "../../hoc/withErrorHandler/withErrorhandler";
class Orders extends React.Component {
  state = {
    orders: null,
    loading: true,
  };
  componentDidMount() {
    axios.get("/orders.json").then((res) => {
      let orders = [];
      for (let key in res.data) {
        orders.push({ ...res.data[key], id: key });
      }
      this.setState((prev) => ({ orders: orders, loading: false }));
    });
  }
  render() {
    let orders = null;
    if (this.state.orders) {
      orders = this.state.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }

    return (
      <div>
        {this.state.loading ? <Spinner /> : null}
        {orders}
      </div>
    );
  }
}
export default WithError(Orders, axios);
