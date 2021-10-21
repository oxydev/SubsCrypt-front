import React, { useContext, useEffect } from "react";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import { getBCDataContext } from "./getBCData";
import SubscriptionModal from "../componenets/user/subscriptionModal";
import { operationContext } from "./handleUserOperation";

let subscrypt;

export const setDataContext = React.createContext({});

export const SetDataFunctions = (props) => {
  const { setModal } = useContext(modalContext);
  const { globalState } = useContext(UserContext);
  const blockChainFuncs = useContext(getBCDataContext);
  const { showResultToUser } = useContext(operationContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  }, []);

  //Refund a plan
  const refundPlan = async (address, injector, callback, providerAddress, planIndex) => {
    injector = await injector.then((res) => res);
    await (await subscrypt).refund(address, injector, callback, providerAddress, planIndex);
  };

  const renewPlan = async (
    address,
    injector,
    callback,
    providerAddress,
    planIndex,
    charcteristicValue
  ) => {
    injector = await injector.then((res) => res);
    await (
      await subscrypt
    ).renew(address, injector, callback, providerAddress, planIndex, charcteristicValue);
  };

  const subscribePlan = async (
    address,
    injector,
    callback,
    providerAddress,
    planIndex,
    user,
    pass,
    planChars
  ) => {
    await (
      await subscrypt
    )
      .getSha2(pass)
      .then(async (res) => {
        // console.log(address, providerAddress, planIndex, res.result, user, planChars);
        injector = await injector.then((res) => res);
        await (
          await subscrypt
        ).subscribe(
          address,
          injector,
          callback,
          providerAddress,
          planIndex,
          res.result,
          user,
          planChars
        );
      })
      .catch(async () => {
        await showResultToUser("Operation faild!", "The operation has been failed!");
      });
  };

  const providerRegisterHandler = async (
    address,
    callback,
    durations,
    prices,
    refundPolicies,
    moneyAddress,
    username,
    pass,
    planChars
  ) => {
    var injector = getWalletInjector(address);
    // console.log(prices, refundPolicies, moneyAddress, username, pass, planChars);
    await (await subscrypt).getSha2(pass).then(async (res) => {
      injector = await injector.then((res) => res);
      await (await subscrypt)
        .providerRegister(
          address.address,
          injector,
          callback,
          durations,
          prices,
          refundPolicies,
          moneyAddress,
          username,
          res.result,
          planChars
        )
        .catch(async () => {
          await showResultToUser("Operation faild!", "The operation has been failed!");
        });
    });
  };

  //Get Injector
  const getWalletInjector = async (address) => {
    let injector;
    await (await subscrypt).getInjector(address).then((result) => {
      injector = result;
    });
    return injector;
  };

  //function for handle the subscription flow
  const handleSubscribtion = async (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.wallet;

    if (!walletAddress && !manualAddress) {
      await blockChainFuncs.connectToWallet(globalState.user.address).then(async (res) => {
        if (res) {
          handleSubscribtion(providerAddress, plan, planIndex, callback, res);
        } else {
          // window.alert("You are not allowed to do this operation!");s
          await showResultToUser(
            "Operation not allowed!",
            "You are not allowed to do this operation!"
          );
        }
      });
    } else {
      if (!walletAddress) {
        walletAddress = manualAddress;
      }
      const modalElement = <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} />;

      function handelModalSubmit(e, formData) {
        e.preventDefault();
        setModal(null);
        // console.log(formData);

        function getPlanCharsFromData(formData) {
          var planChar = [];
          Object.keys(formData).forEach((key) => {
            if (key !== "username" && key !== "password") planChar.push(formData[key]);
          });
          return planChar;
        }

        var planChar = getPlanCharsFromData(formData);
        // console.log(planChar);
        subscribePlan(
          walletAddress.address,
          getWalletInjector(walletAddress),
          callback,
          providerAddress,
          planIndex,
          formData.username,
          formData.password,
          planChar
        ).catch(async () => {
          await showResultToUser("Operation faild!", "The operation has been failed!");
        });
      }

      //check if the user has connected to his wallet or not. If not connect to t now.

      setModal(modalElement);
    }
  };

  //Function for handling the Renew flow
  const handleRenewPlan = async (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.wallet;
    if (!walletAddress && !manualAddress) {
      await blockChainFuncs.connectToWallet(globalState.user.address).then(async (res) => {
        if (res) {
          handleRenewPlan(providerAddress, plan, planIndex, callback, res);
        } else {
          // window.alert("You are not allowed to do this operation!");
          await showResultToUser(
            "Operation Not Allowed!",
            "You are not allowed to do this operation!"
          );
        }
      });
    } else {
      if (!walletAddress) {
        walletAddress = manualAddress;
      }
      const modalElement = (
        <SubscriptionModal plan={plan} handleSubmit={handelModalSubmit} renew={true} />
      );

      function handelModalSubmit(e, formData) {
        e.preventDefault();
        setModal(null);
        // console.log(formData);

        function getPlanCharsFromData(formData) {
          var planChar = [];
          Object.keys(formData).forEach((key) => {
            if (key !== "username" && key !== "password") planChar.push(formData[key]);
          });
          return planChar;
        }

        var planChar = getPlanCharsFromData(formData);
        // console.log(planChar);
        renewPlan(
          walletAddress.address,
          getWalletInjector(walletAddress),
          callback,
          providerAddress,
          planIndex,
          planChar
        ).catch(async () => {
          await showResultToUser("Operation faild!", "The operation has been failed!");
        });
      }
      setModal(modalElement);
    }
  };

  //Function for handling the Refund flow
  const handleRefundPlan = async (providerAddress, plan, planIndex, callback, manualAddress) => {
    let walletAddress = globalState.user.wallet;
    if (!walletAddress && !manualAddress) {
      await blockChainFuncs.connectToWallet(globalState.user.address).then(async (res) => {
        if (res) {
          handleRefundPlan(providerAddress, plan, planIndex, callback, res);
        } else {
          // window.alert("You are not allowed to do this operation!");
          await showResultToUser(
            "Operation Not Allowed!",
            "You are not allowed to do this operation!"
          );
        }
      });
    } else {
      if (!walletAddress) {
        walletAddress = manualAddress;
      }
      refundPlan(
        walletAddress.address,
        getWalletInjector(walletAddress),
        callback,
        providerAddress,
        planIndex
      ).catch(async () => {
        await showResultToUser("Operation faild!", "The operation has been failed!");
      });
    }
  };

  //function for changing the user password
  const changePassword = async (type, newPassword, callback) => {
    let walletAddress = globalState.user.wallet;
    // console.log(walletAddress);
    var injector = getWalletInjector(walletAddress);
    await (await subscrypt).retrieveWholeDataWithWallet(walletAddress.address).then(async (res) => {
      // console.log(res);
      if (res.status !== "Failed" || type === "provider") {
        await (await subscrypt).getSha2(newPassword).then(async (res) => {
          // console.log(res.result);
          injector = await injector.then((res) => res);

          if (type === "user") {
            await (
              await subscrypt
            ).setUserSubscryptPass(walletAddress.address, injector, callback, res.result);
          } else {
            await (
              await subscrypt
            ).setProviderSubscryptPass(walletAddress.address, injector, callback, res.result);
          }
        });
      } else {
        // console.log("you have not any subscription so you can not change a password");
      }
    });

    // console.log(globalState, type, newPassword);
  };

  //function for adding new plan as a provider
  const addNewPlans = async (
    address,
    callback,
    durations,
    prices,
    refundPolicies,
    planChars,
    manualAddress
  ) => {
    let walletAddress = globalState.user.wallet;
    if (!walletAddress && !manualAddress) {
      await blockChainFuncs.connectToWallet(globalState.user.address).then(async (res) => {
        if (res) {
          addNewPlans(address, callback, durations, prices, refundPolicies, planChars, res);
        } else {
          // window.alert("You are not allowed to do this operation!");
          await showResultToUser(
            "Operation Not Allowed!",
            "You are not allowed to do this operation!"
          );
        }
      });
    } else {
      if (!walletAddress) {
        walletAddress = manualAddress;
      }

      var injector = getWalletInjector(walletAddress);
      injector = await injector.then((res) => res);
      await (await subscrypt)
        .addPlan(
          walletAddress.address,
          injector,
          callback,
          durations,
          prices,
          refundPolicies,
          planChars
        )
        .catch(async () => {
          await showResultToUser("Operation faild!", "The operation has been failed!");
        });
    }
  };

  const setDataContextvalue = {
    handleSubscribtion,
    handleRefundPlan,
    changePassword,
    handleRenewPlan,
    addNewPlans,
    providerRegisterHandler,
  };
  return (
    <setDataContext.Provider value={setDataContextvalue}>{props.children}</setDataContext.Provider>
  );
};
