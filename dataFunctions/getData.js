//get user data function

//Function for getting the user plan data after loging in
export const loadUserData = async (username, password, dispatch) => {
  const subscrypt = await import("@oxydev/subscrypt");
  await subscrypt.retrieveWholeDataWithUsername(username, password).then((result) => {
    dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    dispatch({ type: "LOAD_USER", payload: { username: username } });
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
        dispatch({ type: "LOAD_USER", payload: { username: username, type: "provider" } });
        setAuth(true);
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
          dispatch({ type: "LOAD_USER", payload: { username: username, type: "user" } });
          setAuth(true);
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
