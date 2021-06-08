import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";
import { authContext } from "../pages/_app";
import Cookies from "js-cookie";
import { connectToWallet, checkAuthByCookie } from "../dataFunctions/getData";
import { loadPlan, loadUserData, loadUserDataByWallet } from "../dataFunctions/getData";
import data from "../data/testData/providerAddress.json";

//Initialize the global state
const initialState = { providerPlans: [], user: {}, plans: [] };

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
    case "LOAD_PROVIDER_PLANS":
      return { ...state, providerPlans: [...state.providerPlans, action.payload] };
    case "LOG_OUT":
      return {};
    default:
      return { ...state };
  }
};

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(authContext);

  //Defining the global state and dispatching fucntion
  const [globalState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("store");
    checkAuthByCookie(dispatch, setAuth);
  }, []);

  useEffect(() => {
    if (globalState.user) {
      if (globalState.user.type == "user" && router.pathname == "/provider") {
        router.push("/");
      }
      if (globalState.user.type == "provider" && router.pathname == "/user") {
        router.push("/");
      }
    }
  });

  console.log(globalState);

  return (
    <UserContext.Provider value={{ globalState, dispatch }}>{props.children}</UserContext.Provider>
  );
};
