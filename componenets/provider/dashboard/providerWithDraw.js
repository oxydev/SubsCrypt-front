import React, { useContext } from "react";
import { modalContext } from "../../../context/modal";
import { WithdrwaModal } from "./widthDrawModal";

export const ProviderWithdraw = (props) => {
  const { setModal } = useContext(modalContext);

  const handleWithdraw = () => {
    const modalElement = <WithdrwaModal />;
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
