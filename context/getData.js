import React, { useContext } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import WalletSelectionModal from "../componenets/login/walletSelectionModal";
import SubscriptionModal from "../componenets/user/subscriptionModal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { serverDataContext } from "./getServerData";

//constant for using in dynamicly importing the subscrypt library
const subscrypt = import("@oxydev/subscrypt");

//creating a context for all getting and managin data functions to be available in all the components in the project
export const dataContext = React.createContext({});

export const DataFunctions = (props) => {
  const router = useRouter();
  const { auth, setAuth } = useContext(authContext);
  const { setLoading } = useContext(loadingContext);
  const { setModal, setCallBack } = useContext(modalContext);
  const { globalState, dispatch } = useContext(UserContext);
  const serverFunctions = useContext(serverDataContext);

  //Function for getting the user plans data after login by wallet
  const loadUserDataByWallet = async (address) => {
    await (await subscrypt).retrieveWholeDataWithWallet(address).then((result) => {
      setLoading(false);
      if (result.status == "Fetched") {
        let plans = result.result;
        plans.map((item) => {
          getCharacs(item.provider, item.plan_index, item);
        });
      }
    });

    //loading each plan characteristics after getting user data
    async function getCharacs(provider, index, plan) {
      await (await subscrypt).getPlanCharacteristics(provider, index).then((result) => {
        // console.log(result);
        if (result.status == "Fetched") {
          const newPlan = { ...plan, characteristics: result.result };
          setLoading(false);
          dispatch({ type: "LOAD_ONE_USER_PLANS", payload: newPlan });
          serverFunctions.getPlanServerInfo(provider, index, "user");
        }
      });
    }
  };

  //handling wallet connection for login or after login
  const connectToWallet = async (wallets, type, callback, cancelCallback = () => {}) => {
    // console.log("wallet"); log the word wallet to be sure the function has been called.
    if (!auth) {
      setLoading(true);
    }
    await (await subscrypt).getWalletAccess();
    await (await subscrypt).getWalletAccounts().then((result) => {
      if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
        Cookies.set("subscryptType", type);
        const addressList = result.map((item) => item.address);
        // console.log(addressList);
        const indexCookie = Cookies.get("addressIndex");
        // check if the prefered wallet address is stored as cookies
        if (indexCookie) {
          handleConfirm(result, indexCookie);
        } else {
          if (addressList.length == 1) {
            Cookies.set("addressIndex", 0);
            handleConfirm(result, 0);
          } else {
            //show a modal for selecting the prefered wallet address from the address lists
            const modalElement = (
              <WalletSelectionModal
                addressList={addressList}
                handleSubmit={(value) => {
                  // console.log(value);
                  Cookies.set("addressIndex", value);
                  setModal(null);
                  //cal back function is used in situations when you want to call another function after selecting the wallet address
                  setCallBack(() => () => {
                    cancelCallback();
                  });
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

    //function for setting the selected wallet address
    function handleConfirm(result, index) {
      dispatch({ type: "LOAD_WALLETS", payload: result });
      if (auth) {
        dispatch({ type: "LOAD_USER_WALLET", payload: result[index] });
        Cookies.set("subscryptWallet", result[index].address);
      } else {
        dispatch({
          type: "LOAD_USER",
          payload: { type: type, userWallet: result[index] },
        });
        setAuth(true);
        usernameGetter(result[index].address);
        if (type == "user") {
          Cookies.set("subscryptWallet", result[index].address);
          loadUserDataByWallet(result[index].address);
        } else {
          checkIfSignedUp(result[index].address);
        }
      }
      if (callback) {
        callback(result[index]);
      }
    }

    //function for getting and setting the username of a loged in user if is available
    async function usernameGetter(address) {
      await (await subscrypt).getUsername(address).then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          dispatch({
            type: "LOAD_USER_USERNAME",
            payload: result.result,
          });
        }
        Cookies.set("subscrypt", result.result);
      });
    }
  };

  //function for checking if a provider who is logged in by wallet has already signed up as a provider or not
  async function checkIfSignedUp(walletAddress) {
    await (await subscrypt).getPlanLength(walletAddress).then((result) => {
      // console.log(result);
      if (result.status === "Fetched") {
        const planLength = parseInt(result.result);
        Cookies.set("subscryptWallet", walletAddress);
        if (planLength === 0) {
          dispatch({ type: "REGISTERED", payload: false });
        } else {
          dispatch({ type: "REGISTERED", payload: true });
          //getting the necessary info of a provider form server
          serverFunctions.getProviderHeaderInfo(walletAddress);
          getProvidePlanList(walletAddress, planLength);
          serverFunctions.getProviderAllUsers(walletAddress);
        }
        router.push("/provider/");
      }
      setLoading(false);
    });
  }

  //function for checking if the user wallet address is availabe in his wallet address list in his device
  const CheckWallet = async (username) => {
    setLoading(true);
    await (await subscrypt).getAddressByUsername(username).then((result) => {
      // console.log(result);
      checkWalletList(result.result);
    });
    async function checkWalletList(address) {
      await (await subscrypt).getWalletAccess();
      await (await subscrypt).getWalletAccounts().then((result) => {
        let addressList = [];
        for (const item of result) {
          addressList.push(item.address);
        }
        // console.log(addressList);
        const index = addressList.indexOf(address);
        if (index < 0) {
          router.push("/");
          window.alert("You are not allowed to do this operation!");
        } else {
          Cookies.set("subscryptWallet", result[index].address);
          Cookies.set("addressIndex", 0);
          dispatch({ type: "LOAD_USER_WALLET", payload: result[index] });
          setLoading(false);
        }
      });
    }
  };

  //function for getting the provider planList
  const getProvidePlanList = async (address, planNumber) => {
    // console.log(planNumber);
    if (!planNumber) {
      await (await subscrypt).getPlanLength(address).then((result) => {
        // console.log(result);
        if (result.status === "Fetched") {
          const planLength = parseInt(result.result);
          if (planLength != 0) {
            getProvidePlanList(address, planLength);
          }
        }
      });
    } else {
      for (let i = 0; i < planNumber; i++) {
        // load every plan data
        loadPlan(address, i);
      }
    }
  };

  //Function for getting the user plan data after login by username and password
  const loadUserData = async (username, password) => {
    await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
      let plans = result.result;
      // console.log(plans);
      plans.map((item) => {
        //get chractersitics of each plan
        getCharacs(item.provider, item.plan_index, item);
      });

      async function getCharacs(provider, index, plan) {
        await (await subscrypt).getPlanCharacteristics(provider, index).then((result) => {
          // console.log(result);
          if (result.status == "Fetched") {
            const newPlan = { ...plan, characteristics: result.result };
            setLoading(false);
            dispatch({ type: "LOAD_ONE_USER_PLANS", payload: newPlan });
            serverFunctions.getPlanServerInfo(provider, index, "user");
          }
        });
      }
    });
  };

  //Check user authentication by username and password
  const checkUserAuthWithUserName = async (username, password) => {
    await (
      await subscrypt
    )
      .userCheckAuthWithUsername(username, password)
      .then((result) => {
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

          //getting the user plans after login
          loadUserData(username, password);
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          window.alert("Invalid username of password!");
        }
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
      });
  };

  //Check user authentication by username and password
  const checkProviderAuthWithUserName = async (username, password) => {
    await (
      await subscrypt
    )
      .providerCheckAuthWithUsername(username, password)
      .then(async (result) => {
        // console.log(result);
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
          // setLoading(false);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "provider");
          await (await subscrypt).getAddressByUsername(username).then(async (result) => {
            const walletAddress = result.result;
            dispatch({ type: "LOAD_USER_ADDRESS", payload: result.result });
            await (await subscrypt).getPlanLength(walletAddress).then((result) => {
              // console.log(result);
              if (result.status === "Fetched") {
                const planLength = parseInt(result.result);
                Cookies.set("subscryptWallet", walletAddress);
                serverFunctions.getProviderHeaderInfo(walletAddress);
                getProvidePlanList(walletAddress, planLength);
                serverFunctions.getProviderAllUsers(walletAddress);
              }
              setLoading(false);
            });
          });
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          window.alert("Invalid username of password!");
          setAuth(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
      });
  };

  //Check the provider all info
  const getProviderAllInfo = async (walletAddress) => {
    await (await subscrypt).getPlanLength(walletAddress).then((result) => {
      // console.log(result);
      if (result.status === "Fetched") {
        const planLength = parseInt(result.result);
        Cookies.set("subscryptWallet", walletAddress);
        if (planLength === 0) {
          dispatch({ type: "REGISTERED", payload: false });
        } else {
          dispatch({ type: "REGISTERED", payload: true });
          //getting the necessary info of a provider form server
          serverFunctions.getProviderHeaderInfo(walletAddress);
          getProvidePlanList(walletAddress, planLength);
          serverFunctions.getProviderAllUsers(walletAddress);
        }
        router.push("/provider/");
      }
      setLoading(false);
    });
  };

  //check authentication by cookies
  const checkAuthByCookie = async () => {
    console.log("checkAuthbyCookie");
    setLoading(true);
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userWallet = Cookies.get("subscryptWallet");
    if (password) {
      console.log("Password");
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
        // console.log("A provider has been logged in");
        const walletAddress = userWallet;
        dispatch({ type: "LOAD_USER_ADDRESS", payload: walletAddress });
        await (await subscrypt).getPlanLength(walletAddress).then((result) => {
          // console.log(result);
          if (result.status === "Fetched") {
            const planLength = parseInt(result.result);
            serverFunctions.getProviderHeaderInfo(walletAddress);
            getProvidePlanList(walletAddress, planLength);
            serverFunctions.getProviderAllUsers(walletAddress);
          }
          setLoading(false);
        });
      }
    } else if (userWallet) {
      console.log("wallet");
      setAuth(true);
      connectToWallet([], userType);
    }
  };

  //Getting a specific plans data form blockchain
  const loadPlan = async (providerAddress, planIndex) => {
    await (await subscrypt).getPlanData(providerAddress, planIndex).then((result) => {
      // console.log(result);
      result.result.planIndex = planIndex;
      // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
      getCharacs(providerAddress, planIndex, result.result);
    });

    //getting the characteristics of a plan
    async function getCharacs(address, index, plan) {
      await (await subscrypt).getPlanCharacteristics(address, index).then((result) => {
        // console.log(result);
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          plan.providerAddress = address;
          dispatch({ type: "LOAD_PROVIDER_PLANS", payload: plan });
          serverFunctions.getPlanServerInfo(address, index, "provider");
        }
      });
    }
  };

  //Refund a plan
  const refundPlan = async (address, injector, callback, providerAddress, planIndex) => {
    injector = await injector.then((res) => res);
    await (await subscrypt).refund(address, injector, callback, providerAddress, planIndex);
  };

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
      // console.log(address, providerAddress, planIndex, res.result, user, planChars);
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

  const providerRegisterHandler = async (
    address,
    callback,
    durations,
    prices,
    refundPolicies,
    moneyAddress,
    username,
    pass,
    planChars
  ) => {
    var injector = getWalletInjector(address);
    // console.log(prices, refundPolicies, moneyAddress, username, pass, planChars);
    await (await subscrypt).getSha2(pass).then(async (res) => {
      injector = await injector.then((res) => res);
      await (
        await subscrypt
      ).providerRegister(
        address.address,
        injector,
        callback,
        durations,
        prices,
        refundPolicies,
        moneyAddress,
        username,
        res.result,
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
  const handleSubscribtion = (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    const modalElement = <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} />;

    function handelModalSubmit(e, formData) {
      e.preventDefault();
      setModal(null);
      // console.log(formData);

      function getPlanCharsFromData(formData) {
        var planChar = [];
        Object.keys(formData).forEach((key) => {
          if (key !== "username" && key !== "password") planChar.push(formData[key]);
        });
        return planChar;
      }

      var planChar = getPlanCharsFromData(formData);
      // console.log(planChar);
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

    //check if the user has connected to his wallet or not. If not connect to t now.
    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        // console.log(walletAddress);
        handleSubscribtion(providerAddress, plan, planIndex, callback, confirmAddress);
      });
    } else {
      setModal(modalElement);
    }
  };

  //Function for handling the Renew flow
  const handleRenewPlan = (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    const modalElement = (
      <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} renew={true} />
    );

    function handelModalSubmit(e, formData) {
      e.preventDefault();
      setModal(null);
      // console.log(formData);

      function getPlanCharsFromData(formData) {
        var planChar = [];
        Object.keys(formData).forEach((key) => {
          if (key !== "username" && key !== "password") planChar.push(formData[key]);
        });
        return planChar;
      }

      var planChar = getPlanCharsFromData(formData);
      // console.log(planChar);
      renewPlan(
        walletAddress.address,
        getWalletInjector(walletAddress),
        callback,
        providerAddress,
        planIndex,
        planChar
      );
    }

    //check if the user has connected to his wallet or not. If not connect to t now.
    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        // console.log(walletAddress);
        handleRenewPlan(providerAddress, plan, planIndex, callback, confirmAddress);
      });
    } else {
      setModal(modalElement);
    }
  };

  //Function for handling the Refund flow
  const handleRefundPlan = (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.userWallet;
    if (!walletAddress) {
      walletAddress = manualAddress;
    }

    if (!walletAddress) {
      connectToWallet([], "user", (confirmAddress) => {
        // console.log(walletAddress);
        handleRefundPlan(providerAddress, plan, planIndex, callback, confirmAddress);
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

  //function for changing the user password
  const changePassword = async (type, newPassword, callback) => {
    let walletAddress = globalState.user.userWallet;
    // console.log(walletAddress);
    var injector = getWalletInjector(walletAddress);
    await (await subscrypt).retrieveWholeDataWithWallet(walletAddress.address).then(async (res) => {
      // console.log(res);
      if (res.status !== "Failed" || type === "provider") {
        await (await subscrypt).getSha2(newPassword).then(async (res) => {
          // console.log(res.result);
          injector = await injector.then((res) => res);

          if (type === "user") {
            await (
              await subscrypt
            ).setUserSubscryptPass(walletAddress.address, injector, callback, res.result);
          } else {
            await (
              await subscrypt
            ).setProviderSubscryptPass(walletAddress.address, injector, callback, res.result);
          }
        });
      } else {
        // console.log("you have not any subscription so you can not change a password");
      }
    });

    // console.log(globalState, type, newPassword);
  };

  //function for adding new plan as a provider
  const addNewPlans = async (address, callback, durations, prices, refundPolicies, planChars) => {
    let walletAddress = globalState.user.userWallet;
    // console.log(walletAddress);
    var injector = getWalletInjector(walletAddress);
    injector = await injector.then((res) => res);
    await (
      await subscrypt
    ).addPlan(address.address, injector, callback, durations, prices, refundPolicies, planChars);
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
    CheckWallet,
    loadUserData,
    checkUserAuthWithUserName,
    checkProviderAuthWithUserName,
    getProviderAllInfo,
    checkAuthByCookie,
    loadPlan,
    refundPlan,
    renewPlan,
    subscribePlan,
    getWalletInjector,
    getProvidePlanList,
    handleSubscribtion,
    handleRenewPlan,
    handleRefundPlan,
    handleLogOut,
    providerRegisterHandler,
    changePassword,
    addNewPlans,
  };
  return <dataContext.Provider value={contextValue}>{props.children}</dataContext.Provider>;
};
