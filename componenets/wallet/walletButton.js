import React, { useContext } from "react";
import { UserContext } from "../../context/store";
import { authContext, loadingContext } from "../../pages/_app";
import { modalContext } from "../../context/modal";
import WalletSelectionModal from "./walletSelectionModal";
import Cookies from "js-cookie";

const subscrypt = import("@oxydev/subscrypt");

export default function WalletButton(props) {
  const { wallet, status } = props;
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);
  const { loading, setLoading } = useContext(loadingContext);
  const { modal, setModal } = useContext(modalContext);
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
        // var name = window.prompt(JSON.stringify(result[0].address) + '\n' + JSON.stringify(result[1].address) + '\n'
        //   + JSON.stringify(result[2].address) +'\n' + JSON.stringify(result[3].address) + '\n' + JSON.stringify(result[4].address) + '\nEnter number: '
        // )
        //todo popup
        const addressList = result.map((item) => item.address);
        console.log(addressList);
        if (addressList.length == 1) {
          Cookies.set("addressIndex", 0);
          handleconfim(result, 0);
        } else {
          const modalElement = (
            <WalletSelectionModal
              addressList={addressList}
              handleSubmit={(value) => {
                console.log(value);
                Cookies.set("addressIndex", value);
                setModal(null);
                handleconfim(result, value);
              }}
            />
          );
          setModal(modalElement);
        }
      }
    });

    function handleconfim(result, index) {
      dispatch({ type: "LOAD_WALLETS", payload: result });
      dispatch({ type: "LOAD_USER", payload: { type: type, userWallet: result[index] } });
      Cookies.set("subscryptWallet", result[index].address);
      setAuth(true);
      if (type === "user") {
        loadUserDataByWallet(result[index].address);
        usernameGetter(result[index].address);
      } else {
        setLoading(false);
      }
    }

    async function usernameGetter(address) {
      await (await subscrypt).getUsername(address).then((result) => {
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
