import Cookies from "js-cookie";
const subscrypt = import("@oxydev/subscrypt");
import data from "../data/testData/providerAddress.json";

export const checkUserAuthWithUserName = async (username, password, dispatch, setAuth) => {
  console.log(username, password);
  console.log(await (await subscrypt).isConnected());
  await (
    await subscrypt
  )
    .userCheckAuthWithUsername(username, password)
    .then((result) => {
      console.log(result);
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
