import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer } from "react";
import { authContext, loadingContext } from "../pages/_app";
import Cookies from "js-cookie";

const subscrypt = import("@oxydev/subscrypt");

//Initialize the global state
const initialState = { providerPlans: [], user: {}, plans: [], wallets: [] };

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
      return initialState;
    default:
      return { ...state };
  }
};

//Defining the Store functional component to wrap the _app.js and all the components in the project
export const Store = (props) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);

  //Defining the global state and dispatching fucntion
  const [globalState, dispatch] = useReducer(reducer, initialState);

  //Function for getting the user plan data after loging in
  const loadUserData = async (username, password) => {
    await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
      setLoading(false);
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    });
  };

  //Function for getting the user plan data after loging in
  const loadUserDataByWallet = async (address) => {
    await (await subscrypt).retrieveWholeDataWithWallet(address).then((result) => {
      setLoading(false);
      if (result.status == "Fetched") {
        setLoading(false);
        dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
      }
    });
  };

  //Wallet connection
  const connectToWallet = async (wallets, type) => {
    await (await subscrypt).getWalletAccess();
    const accounts = await (await subscrypt).getWalletAccounts().then((result) => {
      if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
        dispatch({ type: "LOAD_WALLETS", payload: result });
        dispatch({ type: "LOAD_USER", payload: { type: type, userWallet: result[1] } });
        Cookies.set("subscryptWallet", result[1].address);
        setAuth(true);
        if (type == "user") {
          loadUserDataByWallet(result[1].address);
        } else {
          setLoading(false);
        }
      }
    });
  };

  //check authentication by cookies
  const checkAuthByCookie = (dispatch, setAuth) => {
    setLoading(true);
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userWallet = Cookies.get("subscryptWallet");
    if (password) {
      setAuth(true);
      dispatch({
        type: "LOAD_USER",
        payload: { username: userName, password: password, type: userType },
      });
      if (userType == "user") {
        loadUserData(userName, password);
      }
      if (userType == "provider") {
        setLoading(false);
        console.log("A provider has been logged in");
      }
    } else if (userWallet) {
      setAuth(true);
      connectToWallet([], userType, dispatch, setAuth);
    }
  };

  useEffect(() => {
    checkAuthByCookie(dispatch, setAuth);
  }, []);

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
