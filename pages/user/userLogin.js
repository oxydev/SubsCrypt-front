import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import { loadingContext } from "../_app";
import Cookies from "js-cookie";

const subscrypt = import("@oxydev/subscrypt");

export default function UserLogin() {
  const { globalState, dispatch } = useContext(UserContext);
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);

  //Function for getting the user plan data after loging in
  const loadUserData = async (username, password) => {
    await (await subscrypt).retrieveWholeDataWithUsername(username, password).then((result) => {
      setLoading(false);
      dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
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

  function handleUserLogin(userName, password) {
    checkUserAuthWithUserName(userName, password);
  }

  return (
    <div className="LoginPage">
      <WalletConnection type="user" />
      <LoginPart handler={handleUserLogin} />
    </div>
  );
}
