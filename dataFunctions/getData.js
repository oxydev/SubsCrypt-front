//get user data function
import Cookies from "js-cookie";

//Function for getting the user plan data after loging in
export const loadUserData = async (username, password, dispatch) => {
  const subscrypt = await import("@oxydev/subscrypt");
  await subscrypt.retrieveWholeDataWithUsername(username, password).then((result) => {
    dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    return "userLoaded";
  });
};

export const checkAuth = async (username, password, dispatch, setAuth) => {
  const subscrypt = await import("@oxydev/subscrypt");
  //Function that check the authentication of a provider an if not check it with user.
  const provider = await subscrypt
    .providerCheckAuthWithUsername(username, password)
    .then((result) => {
      if (result.result == true) {
        dispatch({
          type: "LOAD_USER",
          payload: { username: username, password: password, type: "provider" },
        });
        setAuth(true);
        Cookies.set("subscrypt", username);
        Cookies.set("SubscryptPass", password);
        Cookies.set("SubscryptType", "provider");
      } else {
        checkUser(username, password);
      }
      return result.result;
    })
    .catch((error) => {
      console.log(error);
    });

  //function for checknig authentication of an ordinary user
  async function checkUser(username, password) {
    await subscrypt
      .userCheckAuthWithUsername(username, password)
      .then((result) => {
        if (result.result == true) {
          dispatch({
            type: "LOAD_USER",
            payload: { username: username, password: password, type: "user" },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("SubscryptPass", password);
          Cookies.set("SubscryptType", "user");
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
