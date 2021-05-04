import React from "react";

export default function WalletButton(props) {
  const { wallet, status } = props;
  return (
    <div
      className={status == "active" ? "WalletButton active" : "WalletButton"}
    >
      <div className="WalletButton-ImageContainer">
        <img src={wallet.imageURL} />
      </div>
      <p>{wallet.name}</p>
    </div>
  );
}
