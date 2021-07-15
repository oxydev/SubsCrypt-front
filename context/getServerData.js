import React, { useContext } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { UserContext } from "./store";
import { useRouter } from "next/router";
import axios from "axios";

const subscrypt = import("@oxydev/subscrypt");

export const serverDataContext = React.createContext({});

export const ServerFunctions = (props) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { globalState, dispatch } = useContext(UserContext);

  const getProviderPic = async (address) => {
    const url = "http://206.189.154.160:3000/profile/getProviderPic/" + address;
    axios.get(url).then((result) => {
      console.log(result);
      const data = result.data;
      dispatch({ type: "USER_IMAGE", payload: url });
    });
  };

  const getProviderDescription = async (address) => {
    const url = "http://206.189.154.160:3000/profile/getProviderDescription/" + address;
    axios.get(url).then((result) => {
      console.log(result.data);
      const data = result.data;
      dispatch({ type: "USER_NAME", payload: data.name });
      dispatch({ type: "USER_DESCRIPTION", payload: data.description });
    });
  };

  const getProviderAllUsers = async (address) => {
    const url = "http://206.189.154.160:3000/subscrypt/getUsers/" + address;
    axios.get(url).then((result) => {
      console.log(result.data);
      const data = result.data;
      // dispatch({ type: "USER_NAME", payload: data.name });
      // dispatch({ type: "USER_DESCRIPTION", payload: data.description });
    });
  };

  const getProviderIncome = async (address) => {
    const url = "http://206.189.154.160:3000/subsCrypt/getProviderData/" + address;
    axios.get(url).then((result) => {
      console.log(result.data);
      const data = result.data;
      dispatch({ type: "USER_USERCOUNT", payload: data.userCount });
      dispatch({ type: "USER_INCOME", payload: data.income });
    });
  };

  const getProviderHeaderInfo = (address) => {
    getProviderDescription(address);
    getProviderIncome(address);
    getProviderPic(address);
  };

  const getProductDescription = async (address, index) => {
    const url =
      "http://206.189.154.160:3000/profile/getProductDescription/" + address + "/" + index;
    axios.get(url).then((result) => {
      console.log(result);
    });
  };

  const getUsersOfPlan = async (address, index) => {
    const url = "http://206.189.154.160:3000/subscrypt/getUsersOfPlan/" + address + "/" + index;
    axios.get(url).then((result) => {
      console.log(result);
    });
  };

  const contextValue = {
    getProviderPic,
    getProviderDescription,
    getProviderAllUsers,
    getUsersOfPlan,
    getProductDescription,
    getProviderHeaderInfo,
  };

  return (
    <serverDataContext.Provider value={contextValue}>{props.children}</serverDataContext.Provider>
  );
};
