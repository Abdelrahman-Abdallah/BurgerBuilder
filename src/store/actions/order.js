import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseOrderSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseOrderFail = (err) => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    error: err,
  };
};

// for loading state
export const purchaseLoading = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_Loading,
  };
};

export const orderPurchasedInit = () => {
  return {
    type: actionTypes.ORDER_PURCHASED_INIT,
  };
};
//Async request

export const purchaseBurgerStart = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseLoading());
    axios
      .post("/orders.json?auth" + token, order)
      .then((res) => {
        dispatch(purchaseOrderSucess(res.data.name, order));
      })
      .catch((err) => {
        dispatch(purchaseOrderFail(err));
      });
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCESS,
    orders: orders,
  };
};

export const fetchOrderFails = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
export const fetchOrderLoading = () => {
  return {
    type: actionTypes.FETCH_ORDERS_LOADING,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderLoading());
    axios
      .get("/orders.json?auth=" + token)
      .then((res) => {
        let orders = [];
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(orders));
      })
      .catch((err) => dispatch(fetchOrderFails(err)));
  };
};
