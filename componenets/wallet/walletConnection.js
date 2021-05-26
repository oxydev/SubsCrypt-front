import React from "react";
import data from "../../data/wallets&networks.json";
import WalletButton from "./walletButton";

export default function WalletConnection(props) {
  const wallets = data.wallets.map((item) => <WalletButton key={item.name} wallet={item} />);
  const networks = data.networks.map((item) => <WalletButton key={item.name} wallet={item} />);
  return (
    <section className="WalletConnection">
      <h1>Connect yout Wallet</h1>
      <h2>Choose Network</h2>
      <div className="Networks">{networks}</div>
      <h2>Choose Wallet</h2>
      <div className="Wallets">{wallets}</div>
    </section>
  );
}
