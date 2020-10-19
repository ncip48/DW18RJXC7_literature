import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false || localStorage.getItem("isLogin"),
  user: null,
  isLoading: true,
  //error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        isLoading: false,
      };
    case "UPDATE_PP_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAILED":
      return {
        ...state,
        isLogin: false,
        user: null,
        isLoading: false,
        //error: action.payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
