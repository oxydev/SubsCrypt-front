import React from "react";
import { serverDataContext } from "./getServerData";
import axios from "axios";

export const testServerDataContext = React.createContext({});
export const TestServerFunctions = (props) => {
  //load the provider description from server
  const getProviderDescription = async (address) => {
    const url = "https://api.subscrypt.io/profile/getProviderDescription/" + address;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        return data;
        // dispatch({ type: "USER_NAME", payload: data.name });
        // dispatch({ type: "USER_DESCRIPTION", payload: data.description });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //load the provider income and his users count
  const getProviderIncome = async (address) => {
    const url = "https://api.subscrypt.io/subscriptions/getProviderData/" + address;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        return data;
        // dispatch({ type: "USER_USERSCOUNT", payload: data.usersCount });
        // dispatch({ type: "USER_INCOME", payload: data.income });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const getProviderHeaderInfo = async (address) => {
    const promiseList = [await getProviderDescription(address), await getProviderIncome(address)];

    return await Promise.all(promiseList).then((values) => {
      const data = {
        description: values[0].description,
        name: values[0].name,
        income: values[1].income,
        userCount: values[1].usersCount,
      };
      console.log(data);
      return data;
    });
  };

  const testServerDataContextValue = {
    getProviderDescription,
    getProviderIncome,
    getProviderHeaderInfo,
  };

  return (
    <serverDataContext.Provider value={testServerDataContextValue}>
      {props.children}
    </serverDataContext.Provider>
  );
};
