import React, { useContext } from "react";
import { testDataContext } from "../../context/getDataTest";

//The component for generating the wallet connection button
export default function WalletButton(props) {
  const { wallet, status } = props;
  const { handleSubscriberLoginByWallet, handleProviderLogingByWallet } =
    useContext(testDataContext);
  const type = props.type;

  function handleWalletConnection() {
    if (type == "user") {
      handleSubscriberLoginByWallet();
    } else {
      handleProviderLogingByWallet();
    }
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
