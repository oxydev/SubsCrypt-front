import React, { useState, useEffect, useContext } from "react";
import LoginPart from "../componenets/login/loginPart";
import Connection from "../componenets/login/connection";
import data from "../data/wallets&networks.json";
import Card from "../componenets/login/card";
import { handleDataContext } from "../context/handleData";
import { UserContext } from "../context/store";

const Login = (props) => {
  const { action } = props;
  const [network, setNtwork] = useState(-1);
  const [role, setRole] = useState(-1);
  const [steps, setSteps] = useState([true, false, false]);
  const [method, setMethod] = useState(-1);
  const { handleWalletLists } = useContext(handleDataContext);
  const { globalState } = useContext(UserContext);

  const walletLists = globalState.wallets;

  useEffect(() => {
    if (data.networks.length === 1) {
      setNtwork(0);
    }
    if (action === "signUp") {
      setRole(1);
      setSteps([true, true, true]);
      setMethod(0);
      handleWalletLists();
    }
  }, []);
  useEffect(() => {
    if (steps[0]) {
      setSteps([true, true, false]);
    }
  }, [network]);

  useEffect(() => {
    if (role !== -1) {
      setSteps([true, true, true]);
    }
    console.log(role);
  }, [role]);

  const users = data.roles.map((item, index) => (
    <Card
      key={item.name}
      item={item}
      clickHandler={() => {
        if (action !== "signUp") {
          setRole(index);
        }
      }}
      index={index}
      circle={false}
      selected={index === role ? true : false}
      disabled={index === 0 && action === "signUp" ? true : false}
    />
  ));
  const networks = data.networks.map((item, index) => (
    <Card key={item.name} item={item} selected={index === network ? true : false} circle={true}/>
  ));

  const methods = data.methods.map((item, index) => (
    <Card
      key={item.name}
      item={item}
      selected={index === method ? true : false}
      clickHandler={
        index === 0
          ? () => {
              setMethod(0);
              handleWalletLists();
            }
          : () => {
              setMethod(1);
            }
      }
      circle={true}

    />
  ));

  return (
    <div className="LoginPage SingInPage">
      <div className="LoginPage SingInPage">
        <h1 className="Title">
          {action === "signUp" ? "Sign Up a new Account" : "Login to Your Account"}
        </h1>
        <p className="Topic">Network</p>
        <div className="ChooseNetworks">{networks}</div>
        {steps[1] && (
          <>
            <p className="Topic">Choose Role</p>
            <div className="chooseRole">{users}</div>
          </>
        )}
        {steps[2] && action !== "signUp" && (
          <>
            <p className="Topic">Login Method</p>
            <div className="LoginMethod">
              {/* <p
                onClick={() => {
                  setMethod(0);
                  handleWalletLists();
                }}
              >
                Login by Wallet
              </p>

              <span>or</span>
              <p
                onClick={() => {
                  setMethod(1);
                }}
              >
                Login by Username
              </p> */}
              {methods}
            </div>
            {/* <p className="Topic">Choose Wallet</p>
            <div className="SelectWallet">
              <select>{addressList}</select>
            </div> */}
          </>
        )}
      </div>
      {method === 0 && <Connection type={role === 0 ? "subscriber" : "provider"} />}
      {method === 1 && <LoginPart type={role === 0 ? "subscriber" : "provider"} />}
    </div>
  );
}

export default Login;
