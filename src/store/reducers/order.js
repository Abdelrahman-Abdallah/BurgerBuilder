import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],

  loading: false,
  purchased: false,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER_SUCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
          ...action.orderData,
          id: action.orderId,
        }),
      };
    case actionTypes.ORDER_PURCHASED_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_Loading:
      return { ...state, loading: !state.loading };

    case actionTypes.FETCH_ORDERS_SUCESS:
      return {
        ...state,
        orders: [...action.orders],
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
export default OrderReducer;
