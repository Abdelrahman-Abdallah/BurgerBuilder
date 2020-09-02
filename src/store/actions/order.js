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

//Async request

export const purchaseBurgerStart = (order) => {
  return (dispatch) => {
    axios
      .post("/orders.json", order)
      .then((res) => {
        dispatch(purchaseOrderSucess(res.data.id, res.data));
      })
      .catch((err) => {
        dispatch(purchaseOrderFail(err));
      });
  };
};
