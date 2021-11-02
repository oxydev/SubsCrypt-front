import React, { useState, useEffect, useContext } from "react";
import LoginPart from "../../componenets/login/loginPart";
import Connection from "../../componenets/login/connection";
import data from "../../data/wallets&networks.json";
import Card from "../../componenets/login/card";
import { handleDataContext } from "../../context/handleData";
import tutData from "../../data/tutorial.json";
import { tutorialContext } from "../../context/tutorial";

const Login = (props) => {
  const { action } = props;
  const [network, setNetwork] = useState(-1);
  const [role, setRole] = useState(-1);
  const [steps, setSteps] = useState([true, false, false]);
  const [method, setMethod] = useState(-1);
  const { handleWalletLists } = useContext(handleDataContext);
  const { handleTutorial, continueTutorial } = useContext(tutorialContext);

  const users = data.roles.map((item, index) => (
    <Card
      key={item.name}
      item={item}
      id={index === 0 ? "roleSubscriber" : "roleProvider"}
      clickHandler={() => {
        if (action !== "signUp") {
          setRole(index);
          continueTutorial(tutData.tutorials.login.slice(0, 5), 3);
        }
      }}
      index={index}
      circle={false}
      selected={index === role}
      disabled={index === 0 && action === "signUp"}
    />
  ));
  const networks = data.networks.map((item, index) => (
    <Card
      id={"network"}
      key={item.name}
      item={item}
      selected={index === network}
      circle={true}
    />
  ));

  const methods = data.methods.map((item, index) => (
    <Card
      key={item.name}
      item={item}
      id={index === 0 ? "walletButton" : "usernameButton"}
      selected={index === method}
      clickHandler={
        index === 0
          ? () => {
              setMethod(0);
              handleWalletLists();
              continueTutorial(tutData.tutorials.login, 5);
            }
          : () => {
              handleWalletLists();
              setMethod(1);
            }
      }
      circle={false}
    />
  ));

  const tutorialData = tutData.tutorials.login;

  useEffect(() => {
    if (data.networks.length === 1) {
      setNetwork(0);
    }
    if (action === "signUp") {
      setRole(1);
      setSteps([true, true, true]);
      setMethod(0);
      handleTutorial([
        tutData.tutorials.login[0],
        tutData.tutorials.login[2],
        tutData.tutorials.login[5],
      ]);
      handleWalletLists();
    } else {
      handleTutorial(tutorialData);
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
    // console.log(role);
  }, [role]);
  return (
    <div className="LoginPage SingInPage">
      <div className="LoginPage SingInPage">
        <h1 className="Title">
          {action === "signUp"
            ? "Sign Up a new Account"
            : "Login to Your Account"}
        </h1>
        <p className="Topic">Network</p>
        <div id={"network"} className="ChooseNetworks">
          {networks}
        </div>
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
      {method === 0 && (
        <Connection type={role === 0 ? "subscriber" : "provider"} />
      )}
      {method === 1 && (
        <LoginPart type={role === 0 ? "subscriber" : "provider"} />
      )}
    </div>
  );
};
export default Login;
