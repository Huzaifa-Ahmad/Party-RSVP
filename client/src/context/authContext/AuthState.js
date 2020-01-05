import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setToken from "../../utils/setToken";
import {
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  FAIL_LOGIN,
  FAIL_REGISTER,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR
} from "../types";

export const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    userAuth: null,
    errors: null,
    user: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Get User

  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    // const res = await axios.get("/auth");
    try {
      const res = await axios.get("/auth");
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  };

  //Register User

  const registerUser = async userData => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/register", userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: FAIL_REGISTER,
        payload: error.response.data
      });
    }
  };

  //Login User

  const loginUser = async userData => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/auth", userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: FAIL_LOGIN,
        payload: error.response.data
      });
    }
  };

  const setError = err => {
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  };

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  // Logout User
  const logout = () => {
    dispatch({
      type: LOG_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser: getUser,
        registerUser,
        loginUser,
        setError,
        clearError,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
