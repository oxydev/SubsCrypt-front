import { useState } from "react";
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

export const FaucetModal = (props) => {
  const { walletList, handleSendMoney } = props;
  const [address, setAddress] = useState(null);
  console.log(walletList);
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
    <section className="FaucetModal">
      <form
        className="GiveTokenForm"
        onSubmit={() => {
          handleSendMoney(address);
        }}
      >
        <label>Please Select your wallet address</label>
        <Select
          options={addressList}
          styles={customStyles}
          isSearchable={false}
          placeholder="Select your wallet"
          onChange={(e) => {
            setAddress(walletList[e.value].address);
          }}
        />
        <input type="submit" value="Submit" disabled={!address} />
      </form>
    </section>
  );
};
