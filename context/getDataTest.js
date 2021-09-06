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
  const handleSubscriberLoginByWallet = async () => {
    setLoading(true);
    blockChainFuncs
      .connectToWallet()
      .then((res) => {
        setAuth(true);
        Cookies.set("subscryptType", "user");
        Cookies.set("subscryptWallet", res.address);
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
  const handleProviderLogingByWallet = async () => {
    blockChainFuncs
      .connectToWallet()
      .then((res) => {
        Cookies.set("subscryptType", "provider");
        Cookies.set("subscryptWallet", res.address);
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

  //function for check authentication by cookie
  const checkAuthByCookie = () => {
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userWallet = Cookies.get("subscryptWallet");
    if (password) {
      //do the stuff for auth by username
    } else if (userWallet) {
      //do the stuff for wallet auth
      if (userType == "user") {
        handleSubscriberLoginByWallet();
      } else if (userType == "provider") {
        handleProviderLogingByWallet();
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

  const testdataContextValue = {
    // sendMoneyToAddress,
    handleSubscriberLoginByWallet,
    handleProviderLogingByWallet,
    checkAuthByCookie,
    sendMoneyToAddress,
    // connectToWalltByAddress,
    // loadSubscriberDataByWallet,
    // CheckSubscriberAuthByUsername,
    // CheckProviderAuthByUsername,
    // LoadProviderAllInfo,
    // CheckAuthByCookie,
    // loadPlanByIndex,
    // loadOffers,
    // loadProviderPlanList,
    // handleSubscribtion,
    // handleRenewPlan,
    // handleRefundPlan,
    // handleLogout,
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
