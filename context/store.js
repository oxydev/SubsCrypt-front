import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";

//Initialize the global state
const initialState = { providerPlans: [], user: {}, plans: [], wallets: [], subscriptedUsers: [] };

//Craeting the context to pass to the components in the app tree
export const UserContext = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return { ...state, user: action.payload };
    case "LOAD_USER_USERNAME":
      return { ...state, user: { ...state.user, username: action.payload } };
    case "LOAD_USER_WALLET":
      return { ...state, user: { ...state.user, userWallet: action.payload } };
    case "LOAD_USER_PLANS":
      return { ...state, plans: action.payload };
    case "LOAD_ONE_USER_PLANS":
      return { ...state, plans: [...state.plans, action.payload] };
    case "INVALID_LOGIN":
      return { ...state, user: action.payload };
    case "LOAD_WALLETS":
      return { ...state, wallets: action.payload };
    case "LOAD_PROVIDER_PLANS":
      return {
        ...state,
        providerPlans: [...state.providerPlans, action.payload],
      };
    case "REGISTERED":
      return {
        ...state,
        user: { ...state.user, registered: action.payload },
      };
    //provider server data action type
    case "USER_INCOME":
      return {
        ...state,
        user: { ...state.user, income: action.payload },
      };
    case "USER_NAME":
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    case "USER_DESCRIPTION":
      return {
        ...state,
        user: { ...state.user, description: action.payload },
      };
    case "USER_IMAGE":
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    case "USER_USERSCOUNT":
      return {
        ...state,
        user: { ...state.user, usersCount: action.payload },
      };
    case "PLAN_SERVERINFO":
      let providerPlans = [...state.providerPlans];
      const index = action.payload.index;
      providerPlans[index] = {
        ...providerPlans[index],
        ...action.payload.value,
      };
      return {
        ...state,
        providerPlans: [...providerPlans],
      };
    case "PROVIDER_ALLUSERS":
      console.log(action.payload);
      return {
        ...state,
        subscriptedUsers: [...action.payload],
      };
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
