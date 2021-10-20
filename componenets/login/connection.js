import React, { useContext, useEffect, useState } from "react";
import data from "../../data/wallets&networks.json";
import Card from "./card";
import { handleDataContext } from "../../context/handleData";
import { UserContext } from "../../context/store";

export default function Connection() {
  const [network, setNtwork] = useState(-1);
  const [role, setRole] = useState(-1);
  const [steps, setSteps] = useState([true, false, false]);
  const { handleWalletLists } = useContext(handleDataContext);
  const { globalState } = useContext(UserContext);

  const walletLists = globalState.wallets;
  const addressList = walletLists.map((item, index) => (
    <option key={item + index}>{item.address}</option>
  ));

  useEffect(() => {
    if (data.networks.length == 1) {
      setNtwork(0);
    }
  }, []);
  useEffect(() => {
    if (steps[0]) {
      setSteps([true, true, false]);
    }
  }, [network]);

  useEffect(() => {
    if (role != -1) {
      setSteps([true, true, true]);
      handleWalletLists();
    }
    console.log(role);
  }, [role]);

  const users = data.roles.map((item, index) => (
    <Card
      key={item.name}
      item={item}
      clickHandler={() => {
        setRole(index);
      }}
      index={index}
      selected={index == role ? true : false}
    />
  ));
  const networks = data.networks.map((item, index) => (
    <Card key={item.name} item={item} selected={index == network ? true : false} />
  ));

  return (
    <div className="LoginPage SingInPage">
      <h1 className="Title">Connect your wallet</h1>
      <p className="Topic">Network</p>
      <div className="ChooseNetworks">{networks}</div>
      {steps[1] && (
        <>
          <p className="Topic">Choose Role</p>
          <div className="chooseRole">{users}</div>
        </>
      )}
      {steps[2] && (
        <>
          <p className="Topic">Choose Wallet</p>
          <div className="SelectWallet">
            <select>{addressList}</select>
          </div>
        </>
      )}

      <div className="Divider">
        <div></div>
        <p>or sign up with Username</p>
        <div></div>
      </div>
    </div>
  );
}
