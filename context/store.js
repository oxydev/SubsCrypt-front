import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";

//Initialize the global state
const initialState = {
  providerPlans: [],
  user: {},
  plans: [],
  wallets: [],
  subscriptedUsers: [],
  offerProvider: "5Dyu5YxLufavjPg8vP31BhKs5xz8ncdkQcNdGwf5XtW4C9Ym",
};

//Craeting the context to pass to the components in the app tree
export const UserContext = React.createContext(initialState);

//Reducer function to set the value of global state
const reducer = (state, action) => {
  switch (action.type) {
    //Load whole user data
    case "LOAD_USER":
      return { ...state, user: action.payload };
    //load user username
    case "LOAD_USER_USERNAME":
      return { ...state, user: { ...state.user, username: action.payload } };
    //load user password
    case "LOAD_USER_PASSWORD":
      return { ...state, user: { ...state.user, password: action.payload } };
    //load user wallet
    case "LOAD_USER_WALLET":
      return {
        ...state,
        user: {
          ...state.user,
          wallet: action.payload,
          address: action.payload.address,
        },
      };
    //load user address
    case "LOAD_USER_ADDRESS":
      return { ...state, user: { ...state.user, address: action.payload } };
    //load user plans
    case "LOAD_USER_PLANS":
      return { ...state, plans: action.payload };
    //load only one plan
    case "LOAD_ONE_USER_PLANS": {
      const newPlanList = [...state.plans];
      newPlanList[action.payload.index] = action.payload.plan;
      return { ...state, plans: [...newPlanList] };
    }
    //load provider plans count
    case "LOAD_PROVIDER_PLANS_COUNT": {
      return { ...state, user: { ...state.user, plansCount: action.payload } };
    }
    //announce that the username is invalid
    case "INVALID_LOGIN":
      return { ...state, user: action.payload };
    //load all the addresses in the wallet
    case "LOAD_WALLETS":
      return { ...state, wallets: action.payload };
    //load user wallet account balance by address
    case "LOAD_USER_BALANCE":
      return { ...state, user: { ...state.user, balance: action.payload } };
    //load providers plans. Means the plans that are not belong to the current user
    case "LOAD_PROVIDER_PLANS": {
      // const newPlanList = [...state.providerPlans];
      // newPlanList[action.payload.planIndex] = action.payload;
      return {
        ...state,
        providerPlans: action.payload,
      };
    }
    case "RESET_PROVIDER_PLAN": {
      return {
        ...state,
        providerPlans: [...action.payload],
      };
    }
    //Load the provider address for new offers
    case "LOAD_OFFER_ADDRESS":
      return {
        ...state,
        offerProvider: action.payload,
      };
    //set the provider as a signed up provider
    case "REGISTERED":
      return {
        ...state,
        user: { ...state.user, registered: action.payload },
      };

    //provider server data action type

    //load the provider total income
    case "USER_INCOME":
      return {
        ...state,
        user: { ...state.user, income: action.payload },
      };
    //load the provider name. caveat: Care not be mistaken by the LOAD_USER_USERNAME which is for loading the username not name.
    case "USER_NAME":
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    //load the provider decription
    case "USER_DESCRIPTION":
      return {
        ...state,
        user: { ...state.user, description: action.payload },
      };
    //load the provider image
    case "USER_IMAGE":
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    //load the count of all users are subscripted to the provider
    case "USER_USERSCOUNT":
      return {
        ...state,
        user: { ...state.user, usersCount: action.payload },
      };
    //load the information of a specific plan of a povider
    case "PLAN_SERVERINFO":
      const index = action.payload.index;
      const type = action.payload.type;
      if (type === "provider") {
        let providerPlans = [...state.providerPlans];
        providerPlans[index] = {
          ...providerPlans[index],
          ...action.payload.value,
        };
        return {
          ...state,
          providerPlans: [...providerPlans],
        };
      } else if (type === "user") {
        let plans = [...state.plans];
        plans[index] = {
          ...plans[index],
          ...action.payload.value,
        };
        return {
          ...state,
          plans: [...plans],
        };
      }
    //load the list of subscripted users of a provider with their info
    case "PROVIDER_ALLUSERS":
      return {
        ...state,
        subscriptedUsers: [...action.payload],
      };
    //remove all infos which is stored in the global state when loging out
    case "LOG_OUT":
      return initialState;

    //default action
    default:
      return { ...state };
  }
};

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const router = useRouter();

  //Defining the global state and dispatching fucntion as the ruducer function
  const [globalState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (globalState.user) {
      if (globalState.user.type === "user" && router.pathname === "/provider") {
        router.push("/user/");
      }
      if (globalState.user.type === "provider" && router.pathname === "/user") {
        router.push("/provider/");
      }
    }
  });

  return (
    <UserContext.Provider value={{ globalState, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
