import React, { useContext } from "react";
import { connectToWallet } from "../../dataFunctions/publicDataFunctions";
import { UserContext } from "../../context/store";
import { authContext } from "../../pages/_app";

export default function WalletButton(props) {
  const { wallet, status } = props;
  const { globalState, dispatch } = useContext(UserContext);
  const { setAuth } = useContext(authContext);
  const type = props.type;

  function handleWalletConnection() {
    connectToWallet([], type, dispatch, setAuth);
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
