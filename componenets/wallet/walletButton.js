import React, { useContext } from "react";
import { connectToWallet } from "../../dataFunctions/getData";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";

export default function WalletButton(props) {
  const { wallet, status } = props;
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);

  function handleWalletConnection() {
    connectToWallet([], dispatch, setAuth);
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
