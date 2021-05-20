import React from "react";

export default function TotalIncome(props) {
  return (
    <section className="TotalIncome">
      <h1>Total Income</h1>
      <div>
        <p className="TotalIncome-income">$10,936.78</p>
        <p>
          Net income converted to todays conversation rate
          <br /> via Coinmarketcap.com{" "}
        </p>
        <div className="TotalIncome-eachCoin">
          <div className="IncomeByCoin">
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <p>Polkadot(DOT)</p>
            <p>109.98</p>
          </div>
          <div className="IncomeByCoin">
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <p>Polkadot(DOT)</p>
            <p>109.98</p>
          </div>
          <div className="IncomeByCoin">
            <img src="/icons/png/networks/PolkadotLogo.png" />
            <p>Polkadot(DOT)</p>
            <p>109.98</p>
          </div>
        </div>
      </div>
    </section>
  );
}
