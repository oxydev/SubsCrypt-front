import React from "react";
import axios from "axios";

//creating the context to make all the server functions available in every component in the project
export const serverDataContext = React.createContext({});

export const ServerFunctions = (props) => {
  //load the provider description from server
  const getProviderDescription = async (address) => {
    const url =
      "https://api.subscrypt.io/profile/getProviderDescription/" + address;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        return data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //load the provider income and his users count
  const getProviderIncome = async (address) => {
    const url =
      "https://api.subscrypt.io/subscriptions/getProviderData/" + address;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data;
        return data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //load a plan description from server
  const getProductDescription = async (address, planIndex) => {
    const url =
      "https://api.subscrypt.io/profile/getProductDescription/" +
      address +
      "/" +
      planIndex;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result);
        const data = result.data;
        return data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //load the list of users who are subscripted to a provider's plans
  const getProviderAllUsers = async (address) => {
    const url = "https://api.subscrypt.io/subscriptions/getUsers/" + address;
    return axios
      .get(url)
      .then((result) => {
        // console.log(result.data);
        const data = result.data.subscriptions;
        return data;
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //function for getting all needed provider info for showing in the provider dashboard header from server
  const getProviderHeaderInfo = async (address) => {
    const promiseList = [
      await getProviderDescription(address),
      await getProviderIncome(address),
    ];

    return await Promise.all(promiseList).then((values) => {
      // console.log(values, "values");
      const data = {
        description: values[0].description,
        name: values[0].name,
        income: values[1].income,
        usersCount: values[1].usersCount,
      };
      return data;
    });
  };

  //variable for exporting the functions form the components
  const contextValue = {
    getProviderDescription,
    getProviderAllUsers,
    getProductDescription,
    getProviderHeaderInfo,
  };

  return (
    <serverDataContext.Provider value={contextValue}>
      {props.children}
    </serverDataContext.Provider>
  );
};
