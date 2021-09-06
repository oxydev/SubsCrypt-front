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
          comfirmAddress(value);
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

  //Functions for checking provider registration and return the planLength if registered.
  const checkProviderRegistration = async (address) => {
    return await (
      await subscrypt
    )
      .getPlanLength(address)
      .then((res) => {
        if (res.status == "Fetched") {
          const planLength = parseInt(res.result);
          if (planLength == 0) {
            return "NotRegistered";
          } else {
            return planLength;
          }
        }
      })
      .catch(() => {
        throw new Error("Getting plan length failed");
      });
  };

  //Functions for getting the provider plans data
  const getProviderPlanslist = async (address, count) => {
    let promiseList = [];
    if (!count) {
      return await (await subscrypt).getPlanLength(address).then(async (res) => {
        return await getProviderPlanslist(address, parseInt(res.result));
      });
    } else {
      for (let i = 0; i < count; i++) {
        promiseList.push(
          await loadPlan(address, i)
            .then((res) => {
              console.log(res);
              return res;
            })
            .catch(() => {
              throw new Error("Plan no" + i + "Got a problem");
            })
        );
      }
      return await Promise.all(promiseList).then((values) => {
        console.log(values);
        return values;
      });
    }
  };

  //Function for getting a provider plan according to it's index
  const loadPlan = async (address, index) => {
    console.log("hamid1");

    return await (await subscrypt).getPlanData(address, index).then(async (result) => {
      // console.log(result);
      let plan = result.result;
      plan.planIndex = index;
      // dispatch({ type: "LOAD_PROVIDER_PLANS", payload: result.result });
      return await loadCharacs(address, index, plan).then((res) => {
        return res;
      });
    });
  };

  //Function for getting plan Characteristic
  const loadCharacs = async (address, index, plan) => {
    return await (await subscrypt).getPlanCharacteristics(address, index).then((result) => {
      // console.log(result);
      if (result.status == "Fetched") {
        plan.characteristics = result.result;
        plan.providerAddress = address;
        return plan;
      }
    });
  };

  //Function for getting subscriebr plans according to it's wallet address
  const loadSubscriberPlansbyWallet = async (address) => {
    let plans = [];
    return await (
      await subscrypt
    )
      .retrieveWholeDataWithWallet(address)
      .then(async (result) => {
        if (result.status == "Fetched") {
          console.log(result);
          plans = result.result;
          // console.log(plans);
          if (plans.length == 0) {
            return 0;
          }
          let promiseList = [];

          plans.map(async (item, index) => {
            promiseList.push(
              await loadCharacs(item.provider, item.plan_index, item).then((res) => {
                plan[index] = res;
              })
            );
          });
          return await Promise.all(promiseList).then(() => {
            return plans;
          });
        } else {
          return plans;
        }
      })
      .catch(() => {
        throw new Error("Problem with loading subscriber plans!");
      });
  };

  const blockchainContextValue = {
    connectToWallet,
    checkProviderRegistration,
    getProviderPlanslist,
    checkProviderRegistration,
    loadSubscriberPlansbyWallet,
  };

  return (
    <blockChainContext.Provider value={blockchainContextValue}>
      {props.children}
    </blockChainContext.Provider>
  );
};
