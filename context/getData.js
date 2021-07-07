import React, { useContext } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import WalletSelectionModal from "../componenets/wallet/walletSelectionModal";
import SubscriptionModal from "../componenets/user/userSubscryption/subscriptionModal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const subscrypt = import("@oxydev/subscrypt");

export const dataContext = React.createContext({});

export const DataFunctions = (props) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { modal, setModal, setCallBack } = useContext(modalContext);
  const { globalState, dispatch } = useContext(UserContext);

  //Function for getting the user plan data after loging in
  const loadUserDataByWallet = async (address) => {
    await (await subscrypt)
      .retrieveWholeDataWithWallet(address)
      .then((result) => {
        if (result.status == "Fetched") {
          let plans = result.result;
          //todo plans need a pre process to avoid duplicate plans(renewed or refunded orr expired)
          plans.map((item) => {
            getCharacs(item.provider, item.plan_index, item);
          });
        }
      });

    async function getCharacs(provider, index, plan) {
      await (await subscrypt)
        .getPlanCharacteristics(provider, index)
        .then((result) => {
          console.log(result);
          if (result.status == "Fetched") {
            const newPlan = { ...plan, characteristics: result.result };
            setLoading(false);
            dispatch({ type: "LOAD_ONE_USER_PLANS", payload: newPlan });
          }
        });
    }
  };

  //Wallet connection
  const connectToWallet = async (wallets, type, callback) => {
    console.log("wallet");
    if (!auth) {
      setLoading(true);
    }
    await (await subscrypt).getWalletAccess();
    await (await subscrypt).getWalletAccounts().then((result) => {
      if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
        // var name = window.prompt(JSON.stringify(result[0].address) + '\n' + JSON.stringify(result[1].address) + '\n'
        //   + JSON.stringify(result[2].address) +'\n' + JSON.stringify(result[3].address) + '\n' + JSON.stringify(result[4].address) + '\nEnter number: '
        // )
        //todo popup
        Cookies.set("subscryptType", type);
        const addressList = result.map((item) => item.address);
        console.log(addressList);
        const indexCookie = Cookies.get("addressIndex");
        if (indexCookie) {
          handleConfirm(result, indexCookie);
        } else {
          if (addressList.length == 1) {
            Cookies.set("addressIndex", 0);
            handleConfirm(result, 0);
          } else {
            const modalElement = (
              <WalletSelectionModal
                addressList={addressList}
                handleSubmit={(value) => {
                  console.log(value);
                  Cookies.set("addressIndex", value);
                  setModal(null);
                  setCallBack(() => () => {});
                  handleConfirm(result, value);
                }}
              />
            );
            setModal(modalElement);
            if (!auth) {
              setCallBack(() => () => {
                handleLogOut();
              });
            }
          }
        }
      }
    });

    function handleConfirm(result, index) {
      dispatch({ type: "LOAD_WALLETS", payload: result });
      // Cookies.set("subscryptWallet", result[index].address);
      if (auth) {
        dispatch({ type: "LOAD_USER_WALLET", payload: result[index] });
        Cookies.set("subscryptWallet", result[index].address);
      } else {
        dispatch({
          type: "LOAD_USER",
          payload: { type: type, userWallet: result[index] },
        });
        setAuth(true);
        if (type == "user") {
          Cookies.set("subscryptWallet", result[index].address);
          loadUserDataByWallet(result[index].address);
          usernameGetter(result[index].address);
        } else {
          setLoading(false);
          checkIfSignedUp(result[index].address);
        }
      }
      if (callback) {
        callback(result[index]);
      }
    }

    async function usernameGetter(address) {
      await (await subscrypt).getUsername(address).then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          dispatch({
            type: "LOAD_USER_USERNAME",
            payload: result.result,
          });
          Cookies.set("subscrypt", result.result);
        }
      });
    }

    async function checkIfSignedUp(walletAddress) {
      await (await subscrypt).getPlanLength(walletAddress).then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          const planLength = parseInt(result.result);
          if (planLength == 0) {
            dispatch({ type: "REGISTERED", payload: false });
          } else {
            Cookies.set("subscryptWallet", walletAddress);
            dispatch({ type: "REGISTERED", payload: true });
          }
        }
      });
    }
  };

  //Function for getting the user plan data after loging in
  const loadUserData = async (username, password) => {
    await (await subscrypt)
      .retrieveWholeDataWithUsername(username, password)
      .then((result) => {
        let plans = result.result;
        //todo plans need a pre process to avoid duplicate plans(renewed or refunded orr expired)

        plans.map((item) => {
          getCharacs(item.provider, item.plan_index, item);
        });

        async function getCharacs(provider, index, plan) {
          await (await subscrypt)
            .getPlanCharacteristics(provider, index)
            .then((result) => {
              console.log(result);
              if (result.status == "Fetched") {
                const newPlan = { ...plan, characteristics: result.result };
                setLoading(false);
                dispatch({ type: "LOAD_ONE_USER_PLANS", payload: newPlan });
              }
            });
        }
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
        console.log(result);
        if (result.result == true) {
          dispatch({
            type: "LOAD_USER",
            payload: {
              username: username,
              password: password,
              type: "provider",
            },
          });
          dispatch({ type: "REGISTERED", payload: true });
          setAuth(true);
          setLoading(false);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "provider");
          //todo: get the provider plans
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          setAuth(false);
          setLoading(false);
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
        dispatch({ type: "REGISTERED", payload: true });
        console.log("A provider has been logged in");
      }
    } else if (userWallet) {
      setAuth(true);
      connectToWallet([], userType);
    }
  };

  //Get plans data of a provider
  const loadPlan = async (providerAddress, planIndex) => {
    await (await subscrypt)
      .getPlanData(providerAddress, planIndex)
      .then((result) => {
        console.log(result);
        result.result.planIndex = planIndex;
        // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
        getCharacs(providerAddress, planIndex, result.result);
      });

    async function getCharacs(address, index, plans) {
      await (await subscrypt)
        .getPlanCharacteristics(address, index)
        .then((result) => {
          console.log(result);
          if (result.status == "Fetched") {
            plans.characteristics = result.result;
            dispatch({ type: "LOAD_PROVIDER_PLANS", payload: plans });
          }
        });
    }
  };

  //Refund a plan
  const refundPlan = async (
    address,
    injector,
    callback,
    providerAddress,
    planIndex
  ) => {
    injector = await injector.then((res) => res);
    await (
      await subscrypt
    ).refund(address, injector, callback, providerAddress, planIndex);
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
    ).renew(
      address,
      injector,
      callback,
      providerAddress,
      planIndex,
      charcteristicValue
    );
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
      console.log(
        address,
        providerAddress,
        planIndex,
        res.result,
        user,
        planChars
      );
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

  //function for handle the subscription flow
  const handleSubscribtion = (
    providerAddress,
    plan,
    planIndex,
    callback,
    manualAddress
  ) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    const modalElement = (
      <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} />
    );

    function handelModalSubmit(e, formData) {
      e.preventDefault();
      setModal(null);
      console.log(formData);

      function getPlanCharsFromData(formData) {
        var planChar = [];
        Object.keys(formData).forEach((key) => {
          if (key !== "username" && key !== "password")
            planChar.push(formData[key]);
        });
        return planChar;
      }

      var planChar = getPlanCharsFromData(formData);
      console.log(planChar);
      subscribePlan(
        walletAddress.address,
        getWalletInjector(walletAddress),
        callback,
        providerAddress,
        planIndex,
        formData.username,
        formData.password,
        planChar
      );
    }

    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        console.log(walletAddress);
        handleSubscribtion(
          providerAddress,
          plan,
          planIndex,
          callback,
          confirmAddress
        );
      });
    } else {
      setModal(modalElement);
    }
  };

  //Function for handling the Renew flow
  const handleRenewPlan = (
    providerAddress,
    plan,
    planIndex,
    callback,
    manualAddress
  ) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    const modalElement = (
      <SubscriptionModal
        plan={plan}
        handleSubmit={handelModalSubmit}
        renew={true}
      />
    );

    function handelModalSubmit(e, formData) {
      e.preventDefault();
      setModal(null);
      console.log(formData);

      function getPlanCharsFromData(formData) {
        var planChar = [];
        Object.keys(formData).forEach((key) => {
          if (key !== "username" && key !== "password")
            planChar.push(formData[key]);
        });
        return planChar;
      }

      var planChar = getPlanCharsFromData(formData);
      console.log(planChar);
      renewPlan(
        walletAddress.address,
        getWalletInjector(walletAddress),
        callback,
        providerAddress,
        planIndex,
        planChar
      );
    }

    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        console.log(walletAddress);
        handleRenewPlan(
          providerAddress,
          plan,
          planIndex,
          callback,
          confirmAddress
        );
      });
    } else {
      setModal(modalElement);
    }
  };

  //Function for handling the Refund flow
  const handleRefundPlan = (
    providerAddress,
    plan,
    planIndex,
    callback,
    manualAddress
  ) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        console.log(walletAddress);
        handleRefundPlan(
          providerAddress,
          plan,
          planIndex,
          callback,
          confirmAddress
        );
      });
    } else {
      refundPlan(
        walletAddress.address,
        getWalletInjector(walletAddress),
        callback,
        providerAddress,
        planIndex
      );
    }
  };

  //Log out function
  const handleLogOut = () => {
    Cookies.remove("subscrypt");
    Cookies.remove("subscryptWallet");
    Cookies.remove("subscryptPass");
    Cookies.remove("subscryptType");
    Cookies.remove("addressIndex");
    setAuth(false);
    dispatch({
      type: "LOG_OUT",
      payload: {},
    });
    router.push("/");
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
    handleSubscribtion,
    handleRenewPlan,
    handleRefundPlan,
    handleLogOut,
  };
  return (
    <dataContext.Provider value={contextValue}>
      {props.children}
    </dataContext.Provider>
  );
};
