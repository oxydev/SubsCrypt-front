import React, { useContext, useEffect } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { serverDataContext } from "./getServerData";
import { blockChainContext } from "./blockChianFunctions";

//Variable for using in dynamicly importing the subscrypt library
let subscrypt;

//creating a context for all getting and managin data functions to be available in all the components in the project
export const testDataContext = React.createContext({});

export const TestDataFunctions = (props) => {
  const router = useRouter();
  const { setAuth } = useContext(authContext);
  const { setLoading } = useContext(loadingContext);
  const { setModal } = useContext(modalContext);
  const { dispatch } = useContext(UserContext);
  const serverFunctions = useContext(serverDataContext);
  const blockChainFuncs = useContext(blockChainContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  }, []);

  //Function for setting the wallet in the global state
  const setWallet = (wallet) => {
    dispatch({ type: "LOAD_USER_WALLET", payload: wallet });
    dispatch({ type: "LOAD_USER_ADDRESS", payload: wallet.address });
  };

  //Function for handling the user wallet connection as a subscriber
  const handleSubscriberLoginByWallet = async (address) => {
    setLoading(true);
    blockChainFuncs
      .connectToWallet(address)
      .then((res) => {
        setAuth(true);
        Cookies.set("subscryptType", "user");
        Cookies.set("subscryptAddress", res.address);
        dispatch({
          type: "LOAD_USER",
          payload: { type: "user", wallet: res, address: res.address },
        });
        return res.address;
      })
      .then(async (res) => {
        await blockChainFuncs.loadSubscriberPlansbyWallet(res).then((res) => {
          if (res.length > 0) {
            dispatch({ type: "LOAD_USER_PLANS", payload: res });
          }
          setLoading(false);
        });
      })
      .catch(() => {
        throw new Error("Wallet connection has been canceled");
      });
  };

  //Function for handling the user wallet connection as a subscriber
  const handleProviderLogingByWallet = async (address) => {
    setLoading(true);
    blockChainFuncs
      .connectToWallet(address)
      .then((res) => {
        setAuth(true);
        Cookies.set("subscryptType", "provider");
        Cookies.set("subscryptAddress", res.address);
        dispatch({
          type: "LOAD_USER",
          payload: { type: "provider", wallet: res, address: res.address },
        });
        return res.address;
      })
      .then(async (res) => {
        return await blockChainFuncs.checkProviderRegistration(res).then((response) => {
          return { address: res, planNum: response };
        });
      })
      .then(async (res) => {
        if (res.planNum == "NotRegistered") {
          dispatch({ type: "REGISTERED", payload: false });
          setLoading(false);
        } else {
          dispatch({ type: "REGISTERED", payload: true });
          dispatch({ type: "LOAD_PROVIDER_PLANS_COUNT", payload: res.planNum });
          await getProviderAllInfo(res.address, res.planNum).then(() => {
            setLoading(false);
          });
        }
      })
      .catch(() => {
        throw new Error("Wallet connection has been canceled");
      });
  };

  //Function for handling subscriber login bu username
  const handleSubscriberloginByUsername = async (username, password) => {
    await (
      await subscrypt
    )
      .userCheckAuthWithUsername(username, password)
      .then(async (result) => {
        if (result.result == true) {
          setLoading(true);
          dispatch({
            type: "LOAD_USER",
            payload: { username: username, password: password, type: "user" },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "user");
          await (await subscrypt).getAddressByUsername(username).then(async (result) => {
            const walletAddress = result.result;
            dispatch({ type: "LOAD_USER_ADDRESS", payload: result.result });
            Cookies.set("subscryptAddress", walletAddress);
          });
          return username;
          //getting the user plans after login
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          window.alert("Invalid username of password!");
        }
      })
      .then(async (res) => {
        if (res == username) {
          await blockChainFuncs.loadSubscriberPlansbyUsername(username, password).then((res) => {
            setLoading(false);
            if (res) dispatch({ type: "LOAD_USER_PLANS", payload: res });
          });
        }
      })
      .catch(() => {
        setLoading(false);
        // console.log(error);
      });
  };

  //Function for handling subscriber login bu username
  const handleProviderloginByUsername = async (username, password) => {
    await (
      await subscrypt
    )
      .providerCheckAuthWithUsername(username, password)
      .then(async (result) => {
        if (result.result == true) {
          setLoading(true);
          dispatch({
            type: "LOAD_USER",
            payload: { username: username, password: password, type: "provider" },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "provider");

          return username;
          //getting the user plans after login
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          window.alert("Invalid username of password!");
        }
      })
      .then(async (res) => {
        if (res == username) {
          dispatch({ type: "REGISTERED", payload: true });
          const subscryptAddress = Cookies.get("subscryptAddress");
          if (subscryptAddress === undefined)
            subscryptAddress = await (await subscrypt)
              .getAddressByUsername(username)
              .then(async (result) => {
                const walletAddress = result.result;
                Cookies.set("subscryptAddress", walletAddress);
                return walletAddress;
              });
          dispatch({ type: "LOAD_USER_ADDRESS", payload: subscryptAddress });
          setLoading(false);
          getProviderAllInfo(subscryptAddress)
        }
      })
      .catch(() => {
        setLoading(false);
        // console.log(error);
      });
  };
  //Function for getting all provider plans info
  const getProviderAllInfo = async (address, count) => {
    if (!count) {
      await (await subscrypt).getPlanLength(address).then(async (res) => {
        dispatch({ type: "LOAD_PROVIDER_PLANS_COUNT", payload: res.result });
        await getProviderAllInfo(address, parseInt(res.result));
      });
    } else {
      await serverFunctions.getProviderHeaderInfo(address).then((res) => {
        dispatch({ type: "USER_NAME", payload: res.name });
        dispatch({ type: "USER_DESCRIPTION", payload: res.description });
        dispatch({ type: "USER_USERSCOUNT", payload: res.usersCount });
        dispatch({ type: "USER_INCOME", payload: res.income });
      });
      await blockChainFuncs.getProviderPlanslist(address, count).then((res) => {
        dispatch({ type: "LOAD_PROVIDER_PLANS", payload: res });
      });
      serverFunctions.getProviderAllUsers(address).then((res) => {
        dispatch({ type: "PROVIDER_ALLUSERS", payload: res });
      });
    }
  };

  //Function for loading provider offer
  const loadOffers = async (providerAddress) => {
    if (providerAddress.length < 20) {
      await (
        await subscrypt
      )
        .getAddressByUsername(providerAddress)
        .then((result) => {
          dispatch({ type: "RESET_PROVIDER_PLAN", payload: [] });
          loadOffers(result.result);
        })
        .catch((error) => {
          window.alert("The username you have entered is invalid!!");
        });
    } else {
      await blockChainFuncs.getProviderPlanslist(providerAddress).then((res) => {
        dispatch({ type: "RESET_PROVIDER_PLAN", payload: res });
      });
    }
  };

  //Function for check authentication by cookie
  const checkAuthByCookie = () => {
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userAddress = Cookies.get("subscryptAddress");
    if (password) {
      setLoading(true);
      //do the stuff for auth by username
      if (userType == "user") {
        handleSubscriberloginByUsername(userName, password);
      } else if (userType == "provider") {
        handleProviderloginByUsername(userName, password);
      }
    } else if (userAddress) {
      if (userType == "user") {
        handleSubscriberLoginByWallet(userAddress);
      } else if (userType == "provider") {
        handleProviderLogingByWallet(userAddress);
      }
    }
  };

  //Function for getting the user address for charging money
  const sendMoneyToAddress = () => {
    const modalElement = (
      <div>
        <form className="GiveTokenForm" onSubmit={handleSendMoney}>
          <label>Please input your wallet address</label>
          <input id="modalAddressInput" type="text" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
    setModal(modalElement);

    async function handleSendMoney() {
      setModal(null);
      const address = document.getElementById("modalAddressInput").value;
      await (
        await subscrypt
      )
        .transferToken(address)
        .then((result) => {
          window.alert("Operation has been done successful!");
        })
        .catch((error) => {
          window.alert("Operation failed!");
        });
    }
  };

  //Function for handling logging out
  const handleLogOut = () => {
    Cookies.remove("subscrypt");
    Cookies.remove("subscryptAddress");
    Cookies.remove("subscryptPass");
    Cookies.remove("subscryptType");
    setAuth(false);
    dispatch({
      type: "LOG_OUT",
      payload: {},
    });
    router.push("/");
  };

  const testdataContextValue = {
    handleSubscriberLoginByWallet,
    handleProviderLogingByWallet,
    checkAuthByCookie,
    sendMoneyToAddress,
    handleSubscriberloginByUsername,
    handleProviderloginByUsername,
    loadOffers,
    handleLogOut,
    getProviderAllInfo,
  };
  return (
    <testDataContext.Provider value={testdataContextValue}>
      {props.children}
    </testDataContext.Provider>
  );
};
