import React, { useContext } from "react";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";
import { loadingContext } from "../../pages/_app";
import Cookies from "js-cookie";

const subscrypt = import("@oxydev/subscrypt");

export default function WalletButton(props) {
  const { wallet, status } = props;
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);
  const type = props.type;

  //Function for getting the user plan data after loging in
  const loadUserDataByWallet = async (address) => {
    await (await subscrypt).retrieveWholeDataWithWallet(address).then((result) => {
      setLoading(false);
      if (result.status == "Fetched") {
        setLoading(false);
        dispatch({ type: "LOAD_USER_PLANS", payload: result.result });
      }
    });
  };

  //Wallet connection
  const connectToWallet = async (wallets) => {
    setLoading(true);
    await (await subscrypt).getWalletAccess();
    const accounts = await (await subscrypt).getWalletAccounts().then((result) => {
      if (!(JSON.stringify(wallets) === JSON.stringify(result))) {
        dispatch({ type: "LOAD_WALLETS", payload: result });
        dispatch({ type: "LOAD_USER", payload: { type: type, userWallet: result[1] } });
        Cookies.set("subscryptWallet", result[1].address);
        setAuth(true);
        if (type == "user") {
          loadUserDataByWallet(result[1].address);
          usernameGetter(result[1].address);
        } else {
          setLoading(false);
        }
      }
    });
    async function usernameGetter(address) {
      await (await subscrypt).getUsername().then((result) => {
        console.log(result);
        if (result.status == "Fetched") {
          dispatch({
            type: "LOAD_USER",
            payload: { ...globalState.user, username: result.result },
          });
          Cookies.set("subscrypt", result.result);
        }
      });
    }
  };

  function handleWalletConnection() {
    connectToWallet([]);
  }
  return (
    <div
      className={status == "active" ? "WalletButton active" : "WalletButton"}
      onClick={handleWalletConnection}
    >
      <div className="WalletButton-ImageContainer">
        <img src={wallet.imageURL} />
      </div>
      <p>{wallet.name}</p>
    </div>
  );
}
