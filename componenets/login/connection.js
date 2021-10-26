import React, { useContext, useState } from "react";
import { handleDataContext } from "../../context/handleData";
import { UserContext } from "../../context/store";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "#fff" : "#212121",
    backgroundColor: state.isSelected
      ? "#d71eae"
      : state.isFocused
      ? "#eeeeee"
      : "#fff",
    padding: 20,
    cursor: "pointer",

    h1: {
      fontSize: "14px",
      marginBottom: "10px",
    },

    p: state.isSelected
      ? {
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
        }
      : {
          fontSize: "12px",
          fontWeight: 600,
        },
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    border: "1px solid #e0e0e0",
    height: "60px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "5px 20px",
  }),

  placeholder: (provider) => ({
    ...provider,
    fontSize: "14px",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return {
      ...provided,
      opacity,
      transition,
      h1: {
        fontSize: "14px",
        marginBottom: "5px",
      },
      p: {
        fontSize: "12px",
      },
    };
  },
};

export default function Connection(props) {
  const { type, action } = props;
  const { handleSubscriberLoginByWallet, handleProviderLoginByWallet } =
    useContext(handleDataContext);
  const { globalState } = useContext(UserContext);
  const [address, setAddress] = useState(null);

  const handleConnection = () => {
    if (type === "subscriber") {
      handleSubscriberLoginByWallet(address);
    } else if (type === "provider") {
      // console.log(action)
      handleProviderLoginByWallet(address, action);
    }
  };

  const walletList = globalState.wallets;
  const addressList = walletList.map((item, index) => {
    const value = (
      <>
        <h1>{item.meta.name}</h1>
        <p>{item.address}</p>
      </>
    );
    return {
      value: index,
      label: value,
    };
  });

  return (
    <div className="Connection">
      <h1 className="Title">Connect your wallet</h1>

      {walletList.length > 0 ? (
        <>
          <p className="Topic">Choose your Wallet</p>
          <div className="SelectWallet">
            <Select
              id="chooseWalletAccount"
              options={addressList}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select your wallet"
              onChange={(e) => {
                setAddress(walletList[e.value].address);
              }}
            />
            <button
              disabled={!address}
              onClick={(e) => {
                e.preventDefault();
                handleConnection();
              }}
            >
              {action === "signUp" ? "Sign Up" : "Log in"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="Topic">You do not have any wallet to connect!</p>
          <a href="https://polkadot.js.org/extension/">PolkaDot.js Wallet</a>
        </>
      )}
    </div>
  );
}
