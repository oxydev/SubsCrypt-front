import React, { useState } from "react";

//The component for generating the content of address selection modal
export default function WalletSelectionModal(props) {
  const { addressList, handleSubmit } = props;
  const [value, setValue] = useState(0);
  const addresses = addressList.map((item, index) => (
    <li key={index}>
      <span>{item}</span>
    </li>
  ));

  return (
    <section className="WalletSelectionModal">
      <h1>Select an address to continue</h1>
      <div className="AddressList">
        <ol>{addresses}</ol>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(value - 1);
        }}
      >
        <input
          className="WalletModal-input"
          type="text"
          onChange={(e) => {
            // console.log(e.target.value);
            setValue(parseInt(e.target.value));
          }}
        />
        <input className="WalletModal-Submit" type="submit" value="submit" />
      </form>
    </section>
  );
}
