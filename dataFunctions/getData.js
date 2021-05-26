//get user data function
export const loadUserData = async (username, password, dispatch) => {
  const subscrypt = await import("@oxydev/subscrypt");
  await subscrypt.retrieveWholeDataWithUsername(username, password).then((result) => {
    dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
    dispatch({ type: "LOAD_USER", payload: { username: username } });
    return "userLoaded";
  });
};
