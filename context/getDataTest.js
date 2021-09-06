import React, { useContext, useEffect } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import WalletSelectionModal from "../componenets/login/walletSelectionModal";
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
  const { auth, setAuth } = useContext(authContext);
  const { setLoading } = useContext(loadingContext);
  const { setModal, setCallBack } = useContext(modalContext);
  const { globalState, dispatch } = useContext(UserContext);
  const serverFunctions = useContext(serverDataContext);
  const blockChainFuncs = useContext(blockChainContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  });

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
          console.log(res);
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
    blockChainFuncs
      .connectToWallet(address)
      .then((res) => {
        Cookies.set("subscryptType", "provider");
        Cookies.set("subscryptAddress", res.address);
        dispatch({
          type: "LOAD_USER",
          payload: { type: "provider", wallet: res, address: res.address },
        });
        setAuth(true);
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
            console.log("hamid2", res);
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

  //Function for getting all provider plans info
  const getProviderAllInfo = async (address, count) => {
    let plansCount;
    if (count) {
      plansCount = count;
    } else {
      plansCount = globalState.user.plansCount;
    }
    serverFunctions.getProviderHeaderInfo(address);
    getProviderPlanList(address, plansCount);
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
        console.log("finalres:", res);
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
      //do the stuff for auth by username
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
    // console.log("send money ");
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
          // console.log(result.toHex());
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
    // sendMoneyToAddress,
    handleSubscriberLoginByWallet,
    handleProviderLogingByWallet,
    checkAuthByCookie,
    sendMoneyToAddress,
    handleSubscriberloginByUsername,
    // connectToWalltByAddress,
    // loadSubscriberDataByWallet,
    // CheckSubscriberAuthByUsername,
    // CheckProviderAuthByUsername,
    // LoadProviderAllInfo,
    // CheckAuthByCookie,
    // loadPlanByIndex,
    loadOffers,
    // loadProviderPlanList,
    // handleSubscribtion,
    // handleRenewPlan,
    // handleRefundPlan,
    handleLogOut,
    // providerRegistrationHandler,
    // handleChangePassword,
    // addNewsPlan,
    // refundPlan,
    // renewPlan,
    // subscribePlan,
    // getWalletInjector,
  };
  return (
    <testDataContext.Provider value={testdataContextValue}>
      {props.children}
    </testDataContext.Provider>
  );
};
