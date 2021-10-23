import React, { useEffect, useContext } from "react";
import WalletSelectionModal from "../componenets/login/walletSelectionModal";
import { modalContext } from "./modal";
import { serverDataContext } from "./getServerData";
import SingIn from "../pages/login";
import { operationContext } from './handleUserOperation'

export const getBCDataContext = React.createContext({});

let subscrypt;

export const GetBCDataFunctions = (props) => {
  const { setModal, setCallBack } = useContext(modalContext);
  const serverFunctions = useContext(serverDataContext);
  const { showResultToUser } = useContext(operationContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  }, []);

  //Function for connecting to the wallet
  const connectToWallet = async (address) => {
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
          if (address) {
            let targetWallet;
            for (const item of walletList) {
              if (address == item.address) {
                targetWallet = item;
              }
            }
            return targetWallet;
          } else {
            return await selectwalletFromList(walletList)
              .then((res) => {
                return res;
              })
              .catch(() => {
                throw new Error("Selection canceled!");
              });
          }
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
    const selectWallet = (
      <SingIn
        addressList={addressList}
        handleSubmit={async (value) => {
          comfirmAddress(value);
        }}
      />
    );
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
    // selectWallet;
    // setModal(modalElement);
    // setCallBack(() => () => {
    //   wallet = "notSet";
    // });
    return ensureWalletIsSet(60000)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  //Function for getting wallet address lists
  const getWalletLists = async () => {
    await (await subscrypt).getWalletAccess();
    return await (
      await subscrypt
    )
      .getWalletAccounts()
      .then(async (result) => {
        const walletList = result.map((item) => item);
        return walletList;
      })
      .catch(() => {
        throw new Error("Connection canceled!");
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
      return (await subscrypt).getPlanLength(address).then(async (res) => {
        return getProviderPlanslist(address, parseInt(res.result));
      }).catch(async (err) =>
        await showResultToUser("Failed!", "The Address is not valid!"))
    } else {
      for (let i = 0; i < count; i++) {
        promiseList.push(
          loadPlan(address, i)
            .then((res) => {
              return res;
            })
            .catch(() => {
              throw new Error("Plan no" + i + "Got a problem");
            })
        );
      }
      return await Promise.all(promiseList).then((values) => {
        return values;
      });
    }
  };

  //Function for getting a provider plan according to it's index
  const loadPlan = async (address, index) => {
    return await (await subscrypt).getPlanData(address, index).then(async (result) => {
      let plan = result.result;
      plan.planIndex = index;
      return await loadCharacs(address, index, plan).then((res) => {
        return res;
      });
    });
  };

  //Function for getting plan Characteristic
  const loadCharacs = async (address, index, plan) => {
    return await (
      await subscrypt
    )
      .getPlanCharacteristics(address, index)
      .then((result) => {
        if (result.status == "Fetched") {
          plan.characteristics = result.result;
          plan.providerAddress = address;
          return plan;
        }
      })
      .then(async (res) => {
        return await loadPlanServerInfo(address, index, res).then((res) => {
          return res;
        });
      });
  };

  //Function for getting plan Characteristic
  const getWithdrawableAmount = async (address) => {
    return await (await subscrypt).getWithdrawableAmount(address).then((result) => {
      if (result.status == "Fetched") {
        return result.result;
      }
    });
  };

  //Function for getting money address
  const getMoneyAddress = async (address) => {
    return await (await subscrypt).getMoneyAddress(address).then((result) => {
      if (result.status == "Fetched") {
        return result.result;
      }
    });
  };

  const loadPlanServerInfo = async (address, index, plan) => {
    return await serverFunctions
      .getProductDescription(address, index)
      .then((res) => {
        if (res) {
          plan.name = res.name;
          plan.description = res.description;
        }
        return plan;
      })
      .then(async () => {
        return await serverFunctions.getProviderDescription(address).then((respones) => {
          plan.providerName = respones.name;
          return plan;
        });
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
          plans = result.result;
          if (plans.length == 0) {
            return 0;
          }
          let promiseList = [];

          for (const item of plans) {
            promiseList.push(
              loadCharacs(item.provider, item.plan_index, item).then((res) => {
                return res;
              })
            );
          }
          return await Promise.all(promiseList).then((values) => {
            return values;
          });
        } else {
          return plans;
        }
      })
      .catch(() => {
        throw new Error("Problem with loading subscriber plans!");
      });
  };

  const loadSubscriberPlansbyUsername = async (username, password) => {
    let promiseList = [];
    return await (await subscrypt)
      .retrieveWholeDataWithUsername(username, password)
      .then(async (result) => {
        let plans = result.result;
        for (const item of plans) {
          promiseList.push(
            loadCharacs(item.provider, item.plan_index, item).then((res) => {
              return res;
            })
          );
        }
        return await Promise.all(promiseList).then((values) => {
          return values;
        });
      });
  };

  const getBCDataContextValue = {
    connectToWallet,
    checkProviderRegistration,
    getWalletLists,
    getProviderPlanslist,
    loadSubscriberPlansbyWallet,
    loadSubscriberPlansbyUsername,
    selectwalletFromList,
    getWithdrawableAmount,
    getMoneyAddress,
  };

  return (
    <getBCDataContext.Provider value={getBCDataContextValue}>
      {props.children}
    </getBCDataContext.Provider>
  );
};
