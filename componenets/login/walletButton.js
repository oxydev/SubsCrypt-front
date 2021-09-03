import React, { useContext } from "react";
import { dataContext } from "../../context/getData";
import {Button} from "../../styles/wallet"

//The component for generating the wallet connection button
export default function WalletButton(props) {
  const { wallet, status } = props;
  const { connectToWallet } = useContext(dataContext);
  const type = props.type;

  function handleWalletConnection() {
    connectToWallet([], type);
  }

  return (
    <Button
      className={status == "active" ? "WalletButton active" : "WalletButton"}
      onClick={handleWalletConnection}
    >
      <div className="WalletButton-ImageContainer">
        <img src={wallet.imageURL} />
      </div>
      <p>{wallet.name}</p>
    </Button>
  );
}
