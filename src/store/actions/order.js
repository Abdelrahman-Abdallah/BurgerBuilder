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

export const purchaseBurgerStart = (order) => {
  return (dispatch) => {
    dispatch(purchaseLoading());
    axios
      .post("/orders.json", order)
      .then((res) => {
        dispatch(purchaseOrderSucess(res.data.name, order));
      })
      .catch((err) => {
        dispatch(purchaseOrderFail(err));
      });
  };
};
