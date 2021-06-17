import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";

//Initialize the global state
const initialState = { providerPlans: [], user: {}, plans: [], wallets: [] };

//Craeting the context to pass to the components in the app tree
export const UserContext = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    case "LOAD_USER_WALLET":
      return { ...state, user: { ...state.user, userWallet: action.payload } };
    case "LOAD_USER_PLANS":
      return { ...state, plans: action.payload };
    case "INVALID_LOGIN":
      return { ...state, user: action.payload };
    case "LOAD_WALLETS":
      return { ...state, wallets: action.payload };
    case "LOAD_PROVIDER_PLANS":
      return { ...state, providerPlans: [...state.providerPlans, action.payload] };
    case "LOG_OUT":
      return initialState;
    default:
      return { ...state };
  }
};

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const router = useRouter();

  //Defining the global state and dispatching fucntion
  const [globalState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (globalState.user) {
      if (globalState.user.type == "user" && router.pathname == "/provider") {
        router.push("/user/");
      }
      if (globalState.user.type == "provider" && router.pathname == "/user") {
        router.push("/provider/");
      }
    }
  });

  console.log(globalState);

  return (
    <UserContext.Provider value={{ globalState, dispatch }}>{props.children}</UserContext.Provider>
  );
};
