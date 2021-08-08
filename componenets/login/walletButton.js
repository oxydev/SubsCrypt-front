import React, { useContext } from "react";
import { dataContext } from "../../context/getData";

//The component for generating the wallet connection button
export default function WalletButton(props) {
  const { wallet, status } = props;
  const { connectToWallet } = useContext(dataContext);
  const type = props.type;

  function handleWalletConnection() {
    connectToWallet([], type);
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
