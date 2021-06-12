import Cookies from "js-cookie";
const subscrypt = import("@oxydev/subscrypt");
import data from "../data/testData/providerAddress.json";

export const checkProviderAuthWithUserName = async (username, password, dispatch, setAuth) => {
  await (
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
        dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
        setAuth(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
