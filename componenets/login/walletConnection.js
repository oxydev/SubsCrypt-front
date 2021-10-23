import React from "react";
import data from "../../data/wallets&networks.json";
import WalletButton from "./walletButton";

//The component for generating the login by wallet part
export default function WalletConnection(props) {
  const wallets = data.wallets.map((item) => (
    <WalletButton key={item.name} type={props.type} wallet={item} />
  ));
  const networks = data.networks.map((item) => (
    <WalletButton key={item.name} type={props.type} wallet={item} />
  ));
  return (
    <section className="WalletConnection">
      <h1>
        Connect your Wallet <br /> as {props.type === "user" ? "an ordinary" : "a"} {props.type}
      </h1>
      <h2>Choose Network</h2>
      <div className="Networks">{networks}</div>
      <h2>Choose Wallet</h2>
      <div className="Wallets">{wallets}</div>
    </section>
  );
}
