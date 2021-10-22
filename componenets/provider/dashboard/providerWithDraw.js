import React, { useContext } from "react";
import { modalContext } from "../../../context/modal";
import { WithdrwaModal } from "./widthDrawModal";
import { getBCDataContext } from "../../../context/getBCData";

export const ProviderWithdraw = (props) => {
  const { setModal } = useContext(modalContext);
  const { getWithdrawableAmount, getMoneyAddress } = useContext(getBCDataContext);

  const handleWithdraw = () => {
    const modalElement = (
      <WithdrwaModal
        getWithdrawableAmount={getWithdrawableAmount}
        getMoneyAddress={getMoneyAddress}
      />
    );
    setModal(modalElement);
  };
  return (
    <section className="ProviderWithDraw">
      <h1>Total Withdrable amount:</h1>
      <p>
        14
        <span>DOT</span>
      </p>

      <button onClick={handleWithdraw}>Withdraw</button>
    </section>
  );
};
