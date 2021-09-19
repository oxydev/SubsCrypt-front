import React, { useEffect, useRef, useState } from "react";
import {SelectionModal} from "../../styles/modal"

//The component for generating the content of address selection modal
export default function WalletSelectionModal(props) {
  const inputRef = useRef(null);
  const { addressList, handleSubmit } = props;
  const [value, setValue] = useState(0);
  const addresses = addressList.map((item, index) => (
    <li key={index}>
      <span>{item}</span>
    </li>
  ));
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <SelectionModal className="WalletSelectionModal">
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
          type="number"
          ref={inputRef}
          min={1}
          max={addressList.length}
          onChange={(e) => {
            // console.log(e.target.value);
            setValue(parseInt(e.target.value));
          }}
        />
        <input className="WalletModal-Submit" type="submit" value="submit" />
      </form>
    </SelectionModal>
  );
}
