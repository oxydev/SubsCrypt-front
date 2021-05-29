import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";
import { authContext } from "../pages/_app";
import Cookies from "js-cookie";
import { connectToWallet } from "../dataFunctions/getData";

//Initialize the global state
const initialState = {};

//Craeting the context to pass to the components in the app tree
export const UserContext = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    case "LOAD_USER_PLANS":
      return { ...state, plans: action.payload };
    case "INVALID_LOGIN":
      return { ...state, user: action.payload };
    case "LOAD_WALLETS":
      return { ...state, wallets: action.payload };
    default:
      return { ...state };
  }
};

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const router = useRouter();
  const { auth } = useContext(authContext);
  const userName = Cookies.get("subscrypt");
  const password = Cookies.get("subscryptPass");
  const userType = Cookies.get("subscryptType");

  //Defining the global state and dispatching fucntion
  const [globalState, dispatch] = useReducer(reducer, initialState);

  if (auth && !globalState.user) {
    dispatch({
      type: "LOAD_USER",
      payload: { username: userName, password: password, type: userType },
    });
  }

  useEffect(() => {
    const walletAccounts = globalState.wallets;
    connectToWallet(walletAccounts, dispatch);
  }, []);

  console.log(globalState);

  return (
    <UserContext.Provider value={{ globalState, dispatch }}>{props.children}</UserContext.Provider>
  );
};
