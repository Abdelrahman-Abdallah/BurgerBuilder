import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authStartSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_START_SUCCESS,
    authData,
  };
};
export const authStartFail = (error) => {
  return {
    type: actionTypes.AUTH_START_FAIL,
    error,
  };
};
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwXwSFLLscRVuOJdoUMHz1WuFuYlha0C8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwXwSFLLscRVuOJdoUMHz1WuFuYlha0C8";
    }

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authStartSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authStartFail(err));
      });
  };
};
