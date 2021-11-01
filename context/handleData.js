import React, { useContext, useEffect } from "react";
import { authContext, loadingContext } from "../pages/_app";
import { modalContext } from "./modal";
import { UserContext } from "./store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { serverDataContext } from "./getServerData";
import { getBCDataContext } from "./getBCData";
import { operationContext } from "./handleUserOperation";
import { FaucetModal } from "../componenets/faucet/faucetMdal";

//Variable for using in dynamicly importing the subscrypt library
let subscrypt;

//creating a context for all getting and managin data functions to be available in all the components in the project
export const handleDataContext = React.createContext({});

export const HandleDataFunctions = (props) => {
  const router = useRouter();
  const { setAuth } = useContext(authContext);
  const { setLoading } = useContext(loadingContext);
  const { setModal } = useContext(modalContext);
  const { dispatch } = useContext(UserContext);
  const serverFunctions = useContext(serverDataContext);
  const blockChainFuncs = useContext(getBCDataContext);
  const { showResultToUser } = useContext(operationContext);

  useEffect(() => {
    subscrypt = import("@oxydev/subscrypt");
  }, []);

  const handleWalletBalance = async (address) => {
    blockChainFuncs.getBalance(address).then((res) => {
      // console.log(res);
      dispatch({ type: "LOAD_USER_BALANCE", payload: res });
    });
  };

  //Function for loading user wallets
  const handleWalletLists = async () => {
    blockChainFuncs
      .getWalletLists()
      .then((res) => {
        dispatch({ type: "LOAD_WALLETS", payload: res });
      })
      .catch(async () => {
        await showResultToUser(
          "Wallet selection Error!",
          "Unable to get the wallets list!"
        );
      });
  };

  //Function for handling the user wallet connection as a subscriber
  const handleSubscriberLoginByWallet = async (address) => {
    setLoading(true);
    console.log("here!!!");
    blockChainFuncs
      .connectToWallet(address)
      .then(async (res) => {
        if (res === "notSet") {
          throw new Error("notSet");
        } else {
          setAuth(true);
          Cookies.set("subscryptType", "user");
          Cookies.set("subscryptAddress", res.address);

          let subscryptUsername = Cookies.get("subscrypt");
          // console.log(subscryptUsername);
          if (subscryptUsername === undefined) {
            (await subscrypt).getUsername(res.address).then(async (result) => {
              // console.log(result, "username");
              if (result.status === "Fetched") {
                const username = result.result;
                Cookies.set("subscrypt", username);
                dispatch({
                  type: "LOAD_USER",
                  payload: {
                    type: "user",
                    wallet: res,
                    address: res.address,
                    username: username,
                  },
                });
              } else {
                dispatch({
                  type: "LOAD_USER",
                  payload: { type: "user", wallet: res, address: res.address },
                });
              }
            });
          } else {
            dispatch({
              type: "LOAD_USER",
              payload: {
                type: "user",
                wallet: res,
                address: res.address,
                username: subscryptUsername,
              },
            });
          }
          return res.address;
        }
      })
      .then(async (res) => {
        if (res === "notSet") {
          if (!address) {
            setLoading(false);
            console.log("here!!!");
            await showResultToUser(
              "Wallet selection Error!",
              "You should choose a wallet from your wallet list!"
            ).then(() => {
              router.push("/");
              setAuth(false);
            });
          }
        } else {
          await blockChainFuncs.loadSubscriberPlansByWallet(res).then((res) => {
            setLoading(false);
            console.log("here!!!");
            if (res.length > 0) {
              dispatch({ type: "LOAD_USER_PLANS", payload: res });
            }
          });
        }
      })
      .catch(async (err) => {
        setLoading(false);
        console.log("here!!!");
        if (err.message === "notSet") {
          if (address) {
            // window.alert("You should choose a wallet from your wallet list!");
            await showResultToUser(
              "Wallet selection Error!",
              "You should choose a wallet from your wallet list!"
            );
          } else {
            // window.alert("You should choose a wallet from your wallet list!");
            await showResultToUser(
              "Wallet selection Error!",
              "You should choose a wallet from your wallet list!"
            ).then(() => {
              router.push("/");
              setAuth(false);
            });
          }
        } else {
          // window.alert("Can not connect to wallet!");
          await showResultToUser(
            "Wallet selection Error!",
            "Can not connect to wallet!"
          ).then(() => {
            router.push("/");
          });
        }
      });
  };

  //Function for handling the user wallet connection as a subscriber
  const handleProviderLoginByWallet = async (address, action) => {
    // console.log(address, action)
    setLoading(true);
    console.log("here!!!");
    blockChainFuncs
      .connectToWallet(address)
      .then(async (res) => {
        if (res === "notSet") {
          throw new Error("notSet");
        } else {
          setAuth(true);
          Cookies.set("subscryptType", "provider");
          Cookies.set("subscryptAddress", res.address);
          dispatch({
            type: "LOAD_USER",
            payload: { type: "provider", wallet: res, address: res.address },
          });
          return res.address;
        }
      })
      .then(async (res) => {
        return await blockChainFuncs
          .checkProviderRegistration(res)
          .then((response) => {
            return { address: res, planNum: response };
          });
      })
      .then(async (res) => {
        if (res.planNum === "NotRegistered") {
          if (action !== "login") {
            dispatch({ type: "REGISTERED", payload: false });
            setLoading(false);
            console.log("here!!!");
          } else {
            throw new Error("notSignedUp");
          }
        } else {
          console.log(action);

          if (action !== "signUp") {
            console.log(action);
            dispatch({ type: "REGISTERED", payload: true });
            dispatch({
              type: "LOAD_PROVIDER_PLANS_COUNT",
              payload: res.planNum,
            });
            let subscryptUsername = Cookies.get("subscrypt");
            if (subscryptUsername === undefined) {
              (await subscrypt)
                .getUsername(res.address)
                .then(async (result) => {
                  // console.log(result, "username");
                  const username = result.result;
                  Cookies.set("subscrypt", username);
                  dispatch({ type: "LOAD_USER_USERNAME", payload: username });
                });
            } else {
              dispatch({
                type: "LOAD_USER_USERNAME",
                payload: subscryptUsername,
              });
            }
            setLoading(false);
            console.log("here!!!");
            await getProviderAllInfo(res.address, res.planNum);
          } else {
            throw new Error("alreadyProvider");
          }
        }
      })
      .catch(async (err) => {
        if (err.message === "notSet") {
          if (address) {
            await showResultToUser(
              "Wallet selection Error!",
              "You should choose a wallet from your wallet list!"
            );
          } else {
            await showResultToUser(
              "Wallet selection Error!",
              "You should choose a wallet from your wallet list!"
            ).then(() => {
              router.push("/");
              setAuth(false);
            });
          }
        } else if (err.message === "notSignedUp") {
          await showResultToUser(
            "Failed Authentication!",
            "You should first become a provider and then login with your wallet!"
          ).then(() => {
            handleLogOut();
            router.push("/");
          });
        } else if (err.message === "alreadyProvider") {
          await showResultToUser(
            "Failed to Sign-Up!",
            "You are already a valid provider, please login into your account!"
          ).then(() => {
            handleLogOut();
            router.push("/");
          });
        } else {
          // window.alert("Can not connect to wallet!");
          await showResultToUser(
            "Wallet selection Error!",
            "Can not connect to wallet!"
          ).then(() => {
            router.push("/");
          });
        }
      });
  };

  //Function for handling subscriber login bu username
  const handleSubscriberloginByUsername = async (username, password) => {
    await (
      await subscrypt
    )
      .userCheckAuthWithUsername(username, password)
      .then(async (result) => {
        if (result.result === true) {
          setLoading(true);
          console.log("here!!!");
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "user");
          let subscryptAddress = Cookies.get("subscryptAddress");
          if (subscryptAddress === undefined) {
            (await subscrypt)
              .getAddressByUsername(username)
              .then(async (result) => {
                const walletAddress = result.result;
                Cookies.set("subscryptAddress", walletAddress);
                dispatch({
                  type: "LOAD_USER",
                  payload: {
                    username: username,
                    password: password,
                    type: "user",
                    address: walletAddress,
                  },
                });
                return walletAddress;
              });
          } else {
            dispatch({
              type: "LOAD_USER",
              payload: {
                username: username,
                password: password,
                type: "user",
                address: subscryptAddress,
              },
            });
          }
          return username;
          //getting the user plans after login
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          // window.alert("Invalid username of password!");
          await showResultToUser(
            "Authentication Problem!",
            "Invalid username of password!"
          );
        }
      })
      .then(async (res) => {
        if (res === username) {
          await blockChainFuncs
            .loadSubscriberPlansByUsername(username, password)
            .then((res) => {
              setLoading(false);
              console.log("here!!!");
              if (res) {
                dispatch({ type: "LOAD_USER_PLANS", payload: res });
              }
            });
        }
      })
      .catch(async (err) => {
        console.log(err);
        setLoading(false);
        console.log("here!!!");
        // window.alert("Can not load data!");
        await showResultToUser("Authentication Problem!", "Can not load data!");
        // console.log(error);
      });
  };

  //Function for handling subscriber login bu username
  const handleProviderloginByUsername = async (username, password) => {
    await (
      await subscrypt
    )
      .providerCheckAuthWithUsername(username, password)
      .then(async (result) => {
        if (result.result === true) {
          setLoading(true);
          console.log("here!!!");
          dispatch({
            type: "LOAD_USER",
            payload: {
              username: username,
              password: password,
              type: "provider",
            },
          });
          setAuth(true);
          Cookies.set("subscrypt", username);
          Cookies.set("subscryptPass", password);
          Cookies.set("subscryptType", "provider");

          return username;
          //getting the user plans after login
        } else {
          dispatch({ type: "LOAD_USER", payload: { username: "Invalid" } });
          await showResultToUser(
            "Authentication Problem!",
            "Invalid username of password!"
          );
        }
      })
      .then(async (res) => {
        if (res === username) {
          dispatch({ type: "REGISTERED", payload: true });
          let subscryptAddress = Cookies.get("subscryptAddress");
          if (subscryptAddress === undefined) {
            subscryptAddress = await (await subscrypt)
              .getAddressByUsername(username)
              .then(async (result) => {
                const walletAddress = result.result;
                Cookies.set("subscryptAddress", walletAddress);
                return walletAddress;
              });
          }
          dispatch({ type: "LOAD_USER_ADDRESS", payload: subscryptAddress });
          setLoading(false);
          console.log("here!!!");
          getProviderAllInfo(subscryptAddress);
        }
      })
      .catch(() => {
        setLoading(false);
        console.log("here!!!");
        // console.log(error);
      });
  };
  //Function for getting all provider plans info
  const getProviderAllInfo = async (address, count) => {
    if (!count) {
      await (await subscrypt).getPlanLength(address).then(async (res) => {
        dispatch({ type: "LOAD_PROVIDER_PLANS_COUNT", payload: res.result });
        await getProviderAllInfo(address, parseInt(res.result));
      });
    } else {
      serverFunctions.getProviderHeaderInfo(address).then((res) => {
        dispatch({ type: "USER_NAME", payload: res.name });
        dispatch({ type: "USER_DESCRIPTION", payload: res.description });
        dispatch({ type: "USER_USERSCOUNT", payload: res.usersCount });
        dispatch({ type: "USER_INCOME", payload: res.income });
      });
      blockChainFuncs.getProviderPlanslist(address, count).then((res) => {
        dispatch({ type: "LOAD_PROVIDER_PLANS", payload: res });
        serverFunctions.getProviderAllUsers(address).then((res) => {
          dispatch({ type: "PROVIDER_ALLUSERS", payload: res });
        });
      });
    }
  };

  //Function for loading provider offer
  const loadOffers = async (providerAddress) => {
    if (providerAddress.length < 20) {
      await (
        await subscrypt
      )
        .getAddressByUsername(providerAddress)
        .then(async (result) => {
          if (result.status === "Fetched") {
            dispatch({ type: "RESET_PROVIDER_PLAN", payload: [] });
            await loadOffers(result.result);
          } else {
            await showResultToUser(
              "Provider Not found!",
              "The username you have entered is not a valid Provider!"
            );
          }
        })
        .catch(() => {});
    } else {
      await blockChainFuncs
        .getProviderPlanslist(providerAddress)
        .then((res) => {
          if (res !== true) {
            dispatch({ type: "RESET_PROVIDER_PLAN", payload: res });
          }
        });
    }
  };

  //Function for check authentication by cookie
  const checkAuthByCookie = async () => {
    const userName = Cookies.get("subscrypt");
    const password = Cookies.get("subscryptPass");
    const userType = Cookies.get("subscryptType");
    const userAddress = Cookies.get("subscryptAddress");
    if (password) {
      setLoading(true);
      console.log("here!!!");
      //do the stuff for auth by username
      if (userType === "user") {
        handleSubscriberloginByUsername(userName, password);
      } else if (userType === "provider") {
        handleProviderloginByUsername(userName, password);
      }
    } else if (userAddress) {
      if (userType === "user") {
        handleSubscriberLoginByWallet(userAddress);
      } else if (userType === "provider") {
        handleProviderLoginByWallet(userAddress, "custom");
      }
    }
  };

  //Function for getting the user address for charging money
  const sendMoneyToAddress = () => {
    blockChainFuncs.getWalletLists().then(async (res) => {
      let modalElement;
      if (res.length > 0) {
        modalElement = (
          <FaucetModal walletList={res} handleSendMoney={handleSendMoney} />
        );

        setModal(modalElement);
      } else {
        await showResultToUser(
          "No wallet to choose",
          "You do not have any wallet to choose"
        );
      }
    });

    async function handleSendMoney(address) {
      setModal(null);
      // const address = document.getElementById("modalAddressInput").value;
      await (
        await subscrypt
      )
        .transferToken(address)
        .then(async () => {
          // window.alert("Operation has been done successful!");
          await showResultToUser(
            "Operation Successful!",
            "Operation has been done successfully!"
          );
        })
        .catch(async () => {
          // window.alert("Operation failed!");
          await showResultToUser(
            "Operation Failed!",
            "Operation has been failed!"
          );
        });
    }
  };

  //Function for handling logging out
  const handleLogOut = () => {
    Cookies.remove("subscrypt");
    Cookies.remove("subscryptAddress");
    Cookies.remove("subscryptPass");
    Cookies.remove("subscryptType");
    setAuth(false);
    dispatch({
      type: "LOG_OUT",
      payload: {},
    });
    router.push("/");
  };

  const handleDataContextValue = {
    handleWalletBalance,
    handleSubscriberLoginByWallet,
    handleProviderLoginByWallet,
    checkAuthByCookie,
    sendMoneyToAddress,
    handleWalletLists,
    handleSubscriberloginByUsername,
    handleProviderloginByUsername,
    loadOffers,
    handleLogOut,
    getProviderAllInfo,
  };
  return (
    <handleDataContext.Provider value={handleDataContextValue}>
      {props.children}
    </handleDataContext.Provider>
  );
};
