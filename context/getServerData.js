import React, { useContext } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { UserContext } from "./store";
import { useRouter } from "next/router";
import axios from "axios";

const subscrypt = import("@oxydev/subscrypt");

//creating the context to make all the server functions available in every component in the project
export const serverDataContext = React.createContext({});

export const ServerFunctions = (props) => {
  const { dispatch } = useContext(UserContext);

  //load the provider image url from server
  const getProviderPic = async (address) => {
    const url = "http://206.189.154.160:3000/profile/getProviderPic/" + address;
    axios
      .get(url)
      .then((result) => {
        // console.log(result)
        dispatch({ type: "USER_IMAGE", payload: url });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //load the provider description from server
  const getProviderDescription = async (address) => {
    const url = "http://206.189.154.160:3000/profile/getProviderDescription/" + address;
    axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        dispatch({ type: "USER_NAME", payload: data.name });
        dispatch({ type: "USER_DESCRIPTION", payload: data.description });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //load a plan description from server
  const getProductDescription = async (address, index) => {
    const url =
      "http://206.189.154.160:3000/profile/getProductDescription/" + address + "/" + index;
    axios
      .get(url)
      .then((result) => {
        // console.log(result);
        const data = result.data;
        dispatch({ type: "PLAN_SERVERINFO", payload: { index: index, value: data } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //load the list of users who are subscripted to a provider's plans
  const getProviderAllUsers = async (address) => {
    const url = "http://206.189.154.160:3000/subscriptions/getUsers/" + address;
    axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        dispatch({ type: "PROVIDER_ALLUSERS", payload: data.subscriptions });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //load the provider income and his users count
  const getProviderIncome = async (address) => {
    const url = "http://206.189.154.160:3000/subscriptions/getProviderData/" + address;
    axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        dispatch({ type: "USER_USERSCOUNT", payload: data.usersCount });
        dispatch({ type: "USER_INCOME", payload: data.income });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function for getting all needed provider info for showing in the provider dashboard header from server
  const getProviderHeaderInfo = (address) => {
    getProviderDescription(address);
    getProviderIncome(address);
    getProviderPic(address);
  };

  //loading the list of users whoe are subscripted to a specific plan
  const getUsersOfPlan = async (address, index) => {
    const url = "http://206.189.154.160:3000/subscriptions/getUsersOfPlan/" + address + "/" + index;
    axios
      .get(url)
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //variable for exporting the functions form the components
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
