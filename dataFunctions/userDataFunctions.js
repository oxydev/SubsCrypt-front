import Cookies from "js-cookie";
const subscrypt = import("@oxydev/subscrypt");
import data from "../data/testData/providerAddress.json";

export const checkUserAuthWithUserName = async (username, password, dispatch, setAuth) => {
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
  await (await subscrypt).retrieveWholeDataWithWallet(walletAddress).then((result) => {
    console.log(result);
    if (result.status == "Fetched") {
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    }
    return "userLoaded";
  });
};
