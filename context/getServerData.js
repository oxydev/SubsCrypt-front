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
    });
  };

  const getProviderDescription = async (address) => {
    const url =
      "http://206.189.154.160:3000/profile/getProviderDescription/" + address;
    axios.get(url).then((result) => {
      console.log(result);
    });
  };

  const getProviderAllUsers = async (address) => {
    const url = "http://206.189.154.160:3000/subscrypt/getUsers/" + address;
    axios.get(url).then((result) => {
      console.log(result);
    });
  };

  const getUsersOfPlan = async (address, index) => {
    const url =
      "http://206.189.154.160:3000/subscrypt/getUsersOfPlan/" +
      address +
      "/" +
      index;
    axios.get(url).then((result) => {
      console.log(result);
    });
  };

  const contextValue = {
    getProviderPic,
    getProviderDescription,
    getProviderAllUsers,
    getUsersOfPlan,
  };

  return (
    <serverDataContext.Provider value={contextValue}>
      {props.children}
    </serverDataContext.Provider>
  );
};
