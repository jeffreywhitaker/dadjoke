// import dependencies and functions
import axios from "axios";
import { axiosWithAuth, axiosLogin } from "../utils/axiosWithAuth";

// login existing user
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const userLogin = credentials => dispatch => {
  dispatch({ type: LOGIN_USER_START });
  axiosLogin()
    .post("https://jwhit-dadjokes.herokuapp.com/login", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(`unable to login user: ${err}`);
      dispatch({ type: LOGIN_USER_FAILURE, payload: err });
    });
};

// logout existing user
export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const userLogout = () => dispatch => {
  dispatch({ type: LOGOUT_USER_SUCCESS });
  localStorage.setItem("token", null);
};

// signup existing user
export const SIGNUP_USER_START = "SIGNUP_USER_START";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";
export const userSignup = credentials => dispatch => {
  dispatch({ type: SIGNUP_USER_START });
  axiosLogin()
    .post("https://jwhit-dadjokes.herokuapp.com/createnewuser", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(`unable to login user: ${err}`);
      dispatch({ type: SIGNUP_USER_FAILURE, payload: err });
    });
};
