import React, { useContext } from "react";
import { loadingContext, authContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import WalletSelectionModal from "../componenets/wallet/walletSelectionModal";
import Cookies from "js-cookie";

const subscrypt = import("@oxydev/subscrypt");

export const dataContext = React.createContext({});

export const DataFunctions = (props) => {
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { modal, setModal } = useContext(modalContext);
  const { globalState, dispatch } = useContext(UserContext);

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
    setLoading(true);
    await (await subscrypt).getWalletAccess();
    const accounts = await (await subscrypt).getWalletAccounts().then((result) => {
      if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
        // var name = window.prompt(JSON.stringify(result[0].address) + '\n' + JSON.stringify(result[1].address) + '\n'
        //   + JSON.stringify(result[2].address) +'\n' + JSON.stringify(result[3].address) + '\n' + JSON.stringify(result[4].address) + '\nEnter number: '
        // )
        //todo popup
        const addressList = result.map((item) => item.address);
        console.log(addressList);
        const indexCookie = Cookies.get("addressIndex");
        if (indexCookie) {
          handleconfim(result, indexCookie);
        } else {
          if (addressList.length == 1) {
            Cookies.set("addressIndex", 0);
            handleconfim(result, 0);
          } else {
            const modalElement = (
              <WalletSelectionModal
                addressList={addressList}
                handleSubmit={(value) => {
                  console.log(value);
                  Cookies.set("addressIndex", value);
                  setModal(null);
                  handleconfim(result, value);
                }}
              />
            );
            setModal(modalElement);
          }
        }
      }
    });

    function handleconfim(result, index) {
      dispatch({ type: "LOAD_WALLETS", payload: result });
      dispatch({ type: "LOAD_USER", payload: { type: type, userWallet: result[index] } });
      Cookies.set("subscryptWallet", result[index].address);
      setAuth(true);
      if (type == "user") {
        loadUserDataByWallet(result[index].address);
        usernameGetter(result[index].address);
      } else {
        setLoading(false);
      }
    }

    async function usernameGetter(address) {
      await (await subscrypt).getUsername(address).then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          dispatch({
            type: "LOAD_USER",
            payload: { ...globalState.user, username: result.result },
          });
          Cookies.set("subscrypt", result.result);
        }
      });
    }
  };

  //Function for getting the user plan data after loging in
  const loadUserData = async (username, password) => {
    await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
      setLoading(false);
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    });
  };

  //Check user authentication by username and password
  const checkUserAuthWithUserName = async (username, password) => {
    setLoading(true);
    await (
      await subscrypt
    )
      .userCheckAuthWithUsername(username, password)
      .then((result) => {
        if (result.result == true) {
          dispatch({
            type: "LOAD_USER",
            payload: { username: username, password: password, type: "user" },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "user");

          //fetchinn the user plans after login
          loadUserData(username, password);
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          setAuth(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  //Check user authentication by username and password
  const checkProviderAuthWithUserName = async (username, password) => {
    setLoading(true);
    await (
      await subscrypt
    )
      .providerCheckAuthWithUsername(username, password)
      .then((result) => {
        setLoading(false);
        if (result.result == true) {
          dispatch({
            type: "LOAD_USER",
            payload: { username: username, password: password, type: "provider" },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "provider");
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          setAuth(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  //check authentication by cookies
  const checkAuthByCookie = () => {
    setLoading(true);
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userWallet = Cookies.get("subscryptWallet");
    if (password) {
      if (userType == "user") {
        setAuth(true);
        dispatch({
          type: "LOAD_USER",
          payload: { username: userName, password: password, type: "user" },
        });
        loadUserData(userName, password);
      }
      if (userType == "provider") {
        setLoading(false);
        setAuth(true);
        dispatch({
          type: "LOAD_USER",
          payload: { username: userName, password: password, type: "provider" },
        });
        loadUserData(userName, password);
        console.log("A provider has been logged in");
      }
    } else if (userWallet) {
      setAuth(true);
      connectToWallet([], userType);
    }
  };

  //Get plans data of a provider
  const loadPlan = async (providerAddress, planIndex) => {
    await (await subscrypt).getPlanData(providerAddress, planIndex).then((result) => {
      console.log(result);
      result.result.planIndex = planIndex;
      // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
      getCharacs(providerAddress, planIndex, result.result);
    });

    async function getCharacs(address, index, plans) {
      await (await subscrypt).getPlanCharacteristics(address, index).then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          plans.characteristics = result.result;
          dispatch({ type: "LOAD_PROVIDER_PLANS", payload: plans });
        }
      });
    }
  };

  //Refund a plan
  const refundPlan = async (address, injector, callback, providerAddress, planIndex) => {
    injector = await injector.then((res) => res);
    await (await subscrypt).refund(address, injector, callback, providerAddress, planIndex);
  };

  //Refund a plan
  const renewPlan = async (
    address,
    injector,
    callback,
    providerAddress,
    planIndex,
    charcteristicValue
  ) => {
    injector = await injector.then((res) => res);
    await (
      await subscrypt
    ).renew(address, injector, callback, providerAddress, planIndex, charcteristicValue);
  };

  const subscribePlan = async (
    address,
    injector,
    callback,
    providerAddress,
    planIndex,
    user,
    pass,
    planChars
  ) => {
    await (await subscrypt).getSha2(pass).then(async (res) => {
      console.log(address, providerAddress, planIndex, res.result, user, planChars);
      injector = await injector.then((res) => res);
      await (
        await subscrypt
      ).subscribe(
        address,
        injector,
        callback,
        providerAddress,
        planIndex,
        res.result,
        user,
        planChars
      );
    });
  };

  //Get Injector
  const getWalletInjector = async (address) => {
    let injector;
    await (await subscrypt).getInjector(address).then((result) => {
      injector = result;
    });
    return injector;
  };

  const contextValue = {
    connectToWallet,
    loadUserData,
    checkUserAuthWithUserName,
    checkProviderAuthWithUserName,
    checkAuthByCookie,
    loadPlan,
    refundPlan,
    renewPlan,
    subscribePlan,
    getWalletInjector,
  };
  return <dataContext.Provider value={contextValue}>{props.children}</dataContext.Provider>;
};
