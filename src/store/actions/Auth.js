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
    ...authData,
  };
};
export const authStartFail = (error) => {
  return {
    type: actionTypes.AUTH_START_FAIL,
    error,
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const logoutTimeout = (timeout) => {
  console.log(`timeout `, timeout);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, +timeout * 1000);
  };
};
export const auth = (email, password, isSignUp) => {
  const KEY = process.env.REACT_APP_API_SECRET_KEY;
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
    }

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiresIn", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authStartSuccess(res.data));
        dispatch(logoutTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authStartFail(err.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      return dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiresIn"));
      if (expirationDate > new Date()) {
        dispatch(authStartSuccess({ token: token, localId: userId }));

        const diffrenecetime = expirationDate.getTime() - new Date().getTime();
        dispatch(logoutTimeout(diffrenecetime / 1000));
      } else {
        dispatch(authLogout());
      }
    }
  };
};
