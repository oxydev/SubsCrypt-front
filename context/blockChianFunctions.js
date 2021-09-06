import React, { useEffect, useContext } from "react";
import WalletSelectionModal from "../componenets/login/walletSelectionModal";
import { modalContext } from "./modal";

export const blockChainContext = React.createContext({});

let subscrypt;

export const BlockChainFuncs = (props) => {
  const { setModal, setCallBack } = useContext(modalContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  });

  //Function for connecting to the wallet
  const connectToWallet = async () => {
    console.log("hamid1");
    await (await subscrypt).getWalletAccess();
    return await (
      await subscrypt
    )
      .getWalletAccounts()
      .then(async (result) => {
        const walletList = result.map((item) => item);
        const walletNumber = walletList.length;
        if (walletNumber == 1) {
          return walletList[0];
        } else {
          return await selectwalletFromList(walletList)
            .then((res) => {
              return res;
            })
            .catch(() => {
              throw new Error("Selection canceled!");
            });
        }
      })
      .then((res) => {
        return res;
      })
      .catch(() => {
        throw new Error("Connection canceled!");
      });
  };

  //Function for getting the user wallet from a wallet list by creating a modal
  const selectwalletFromList = async (walletList) => {
    let wallet;

    const addressList = walletList.map((item) => item.address);
    const modalElement = (
      <WalletSelectionModal
        addressList={addressList}
        handleSubmit={async (value) => {
          await comfirmAddress(value);
        }}
      />
    );

    //Function for gettingthe user input from the wallet list modal
    const comfirmAddress = async (value) => {
      setModal(null);
      //cal back function is used in situations when you want to call another function after selecting the wallet address
      setCallBack(() => () => {
        throw new Error("Selection canceled!");
      });
      wallet = walletList[value];
    };

    //Promise for getting the user input and then doing some action
    function ensureWalletIsSet(timeout) {
      var start = Date.now();
      return new Promise(waitForWallet);
      function waitForWallet(resolve, reject) {
        if (wallet) resolve(wallet);
        else if (timeout && Date.now() - start >= timeout) reject(new Error("timeout"));
        else setTimeout(waitForWallet.bind(this, resolve, reject), 30);
      }
    }

    setModal(modalElement);
    return ensureWalletIsSet(60000)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const blockchainContextValue = {
    connectToWallet,
  };

  return (
    <blockChainContext.Provider value={blockchainContextValue}>
      {props.children}
    </blockChainContext.Provider>
  );
};
