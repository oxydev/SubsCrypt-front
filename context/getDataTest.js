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
  const connectToWalletAsSubscriber = async () => {
    blockChainFuncs
      .connectToWallet()
      .then((res) => {
        Cookies.set("subscryptType", "user");
        Cookies.set("subscryptWallet", res.address);
        dispatch({
          type: "LOAD_USER",
          payload: { type: "user", wallet: res, address: res.address },
        });
        setAuth(true);
      })
      .catch(() => {
        throw new Error("Wallet connection has been canceled");
      });
  };

  //Function for handling the user wallet connection as a subscriber
  const connectToWalletAsProvider = async () => {
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

  //Function for checking if a provider is registered according to his wallet
  const checkProviderRegistration = async (address) => {
    return await (
      await subscrypt
    )
      .getPlanLength(address)
      .then((res) => {
        if (res.status == "Fetched") {
          const planLength = parseInt(res.result);
          if (planLength == 0) {
            dispatch({ type: "REGISTERED", payload: false });
            return "NotRegistered";
          } else {
            dispatch({ type: "REGISTERED", payload: true });
            dispatch({ type: "LOAD_PROVIDER_PLANS_COUNT", payload: planLength });

            return planLength;
          }
        }
      })
      .catch(() => {
        throw new Error("Getting plan length failed");
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

  //Function for getting provider's all plans
  const getProviderPlanList = async (address, count) => {
    for (let i = 0; i < count; i++) {
      loadPlan(address, i);
    }
  };

  //Function for getting a provider plan according to it's index
  const loadPlan = async (address, index) => {
    await (await subscrypt).getPlanData(address, index).then(async (result) => {
      // console.log(result);
      result.result.planIndex = index;
      // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
      await (await subscrypt).getPlanCharacteristics(address, index).then((result) => {
        // console.log(result);
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          plan.providerAddress = address;
          dispatch({ type: "LOAD_PROVIDER_PLANS", payload: plan });
          serverFunctions.getPlanServerInfo(address, index, "provider", index);
        }
      });
    });
  };

  //Function for getting subscriber plans
  const loadSubscriberPlansbyWallet = async (address) => {
    await (await subscrypt).retrieveWholeDataWithWallet(address).then((result) => {
      if (result.status == "Fetched") {
        let plans = result.result;
        // console.log(plans);
        if (plans.length == 0) {
          setLoading(false);
        }
        plans.map(async (item, index) => {
          await (await subscrypt)
            .getPlanCharacteristics(item.provider, item.plan_index)
            .then((result) => {
              // console.log(result);
              if (result.status == "Fetched") {
                const newPlan = { ...item, characteristics: result.result };
                dispatch({ type: "LOAD_ONE_USER_PLANS", payload: { plan: newPlan, index: index } });
                serverFunctions.getPlanServerInfo(item.provider, item.plan_index, "user", index);
                setLoading(false);
              }
            });
        });
      } else {
        setLoading(false);
      }
    });
  };

  const testdataContextValue = {
    // sendMoneyToAddress,
    connectToWalletAsSubscriber,
    connectToWalletAsProvider,
    // connectToWalltByAddress,
    loadSubscriberPlansbyWallet,
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
