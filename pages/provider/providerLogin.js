import { useContext } from "react";
import LoginPart from "../../componenets/wallet/loginPart";
import WalletConnection from "../../componenets/wallet/walletConnection";
import { UserContext } from "../../context/store";
import { authContext } from "../_app";
import { loadingContext } from "../_app";
import { useRouter } from "next/router";

export default function ProviderLogin() {
  const router = useRouter();
  const { globalState, dispatch } = useContext(UserContext);
  const { auth, setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);

  //Check user authentication by username and password
  const checkProviderAuthWithUserName = async (username, password) => {
    setLoading(true);
    await (
      await subscrypt
    )
      .providerCheckAuthWithUsername(username, password)
      .then((result) => {
        setLoading(false);
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
        setLoading(false);
        console.log(error);
      });
  };

  function handleProviderLogin(userName, password) {
    checkProviderAuthWithUserName(userName, password);
  }

  return (
    <div className="LoginPage">
      <WalletConnection type="provider" />
      <LoginPart handler={handleProviderLogin} />
    </div>
  );
}
