//get user data function
import Cookies from "js-cookie";
const subscrypt = import("@oxydev/subscrypt");
import data from "../data/testData/providerAddress.json";

export const checkAuthWithUserName = async (username, password, dispatch, setAuth) => {
  //Function that check the authentication of a provider by user name and password an if not check it with user.

  const provider = await (
    await subscrypt
  )
    .providerCheckAuthWithUsername(username, password)
    .then((result) => {
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
        checkUser(username, password);
      }
      return result.result;
    })
    .catch((error) => {
      console.log(error);
    });

  //function for checking authentication of an ordinary user
  async function checkUser(username, password) {
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
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          setAuth(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//Function for getting the user plan data after loging in
export const loadUserData = async (username, password, dispatch) => {
  await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
    dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    return "userLoaded";
  });
};

//Function for getting the user plan data after loging in
export const loadUserDataByWallet = async (walletAddress, dispatch) => {
  console.log("wallet");
  await (await subscrypt).retrieveWholeDataWithWallet(walletAddress).then((result) => {
    console.log(result);
    if (result.status == "Fetched") {
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    }
    return "userLoaded";
  });
};

//Wallet connection
export const connectToWallet = async (wallets, dispatch, setAuth) => {
  await (await subscrypt).getWalletAccess();
  const accounts = await (await subscrypt).getWalletAccounts().then((result) => {
    if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
      dispatch({ type: "LOAD_WALLETS", payload: result });
      dispatch({ type: "LOAD_USER", payload: { type: "user", userWallet: result[1] } });
      Cookies.set("subscryptWallet", result[1].address);
      setAuth(true);
    }
  });
  return accounts;
};

//Get plans data of a provider
export const loadPlan = async (providerAddress, planIndex, dispatch) => {
  await (await subscrypt).getPlanData(providerAddress, planIndex).then((result) => {
    console.log(result);
    result.result.planIndex = planIndex;
    dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
  });
};

//Refund a plan
export const refundPlan = async (address, injector, callback, providerAddress, planIndex) => {
  injector = await injector.then((res) => res);
  await (await subscrypt).refund(address, injector, callback, providerAddress, planIndex);
};

//Refund a plan
export const renewPlan = async (
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

export const subscribePlan = async (address, injector, callback, providerAddress, planIndex) => {
  injector = await injector.then((res) => res);
  await (
    await subscrypt
  ).subscribe(
    address,
    injector,
    callback,
    providerAddress,
    planIndex,
    "0x3534676a919e4dfb214574e8ce5e2d67bac2159a6571f952c2fd11de31a07270",
    "user2",
    []
  );
};

//Get Injector
export const getWalletInjector = async (address) => {
  let injector;
  await (await subscrypt).getInjector(address).then((result) => {
    injector = result;
  });
  return injector;
};

//Redesining the functions
export const checkAuthByCookie = (dispatch, setAuth) => {
  const userName = Cookies.get("subscrypt");
  const password = Cookies.get("subscryptPass");
  const userType = Cookies.get("subscryptType");
  const userWallet = Cookies.get("subscryptWallet");
  if (userName) {
    setAuth(true);
    dispatch({
      type: "LOAD_USER",
      payload: { username: userName, password: password, type: userType },
    });
    if (userType == "user") {
      loadUserData(userName, password, dispatch);
    }
    if (userType == "provider") {
      loadPlan(data.providerAddress, 0, dispatch);
    }
  } else if (userWallet) {
    setAuth(true);
    connectToWallet([], dispatch, setAuth);
    loadUserDataByWallet(userWallet, dispatch);
  }
};
