import React, { useContext, useEffect, useState } from "react";
import data from "../../data/wallets&networks.json";
import Card from "./card";
import { handleDataContext } from "../../context/handleData";
import { UserContext } from "../../context/store";

export default function Connection(props) {
  const { type } = props;
  const { handleSubscriberLoginByWallet, handleProviderLogingByWallet } =
    useContext(handleDataContext);
  const { globalState } = useContext(UserContext);
  const [address, setAddress] = useState(null);

  const handleConnection = () => {
    if (type == "subscriber") {
      handleSubscriberLoginByWallet(address);
      console.log("subscriber");
    } else if (type == "provider") {
      handleProviderLogingByWallet(address);
    }
  };

  const walletLists = globalState.wallets;
  const addressList = walletLists.map((item, index) => (
    <option key={item + index} value={index}>
      {item.address}
    </option>
  ));

  return (
    <div className="LoginPage SingInPage">
      <h1 className="Title">Connect your wallet</h1>

      {walletLists.length > 0 ? (
        <>
          <p className="Topic">Choose your Wallet</p>
          <div className="SelectWallet">
            <select
              onChange={(e) => {
                setAddress(walletLists[e.target.value].address);
              }}
            >
              <option disabled selected>
                Select your Wallet
              </option>
              {addressList}
            </select>
            <button
              disabled={address ? false : true}
              onClick={(e) => {
                e.preventDefault();
                handleConnection();
              }}
            >
              Login
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="Topic">You do not have any wallet to connect!</p>
          <a href="https://polkadot.network/">Polkadot Network</a>
        </>
      )}
    </div>
  );
}
