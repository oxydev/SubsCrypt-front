import React, { useContext,useState ,useEffect } from "react";
import { modalContext } from "../../../context/modal";
import { WithdrwaModal } from "./widthDrawModal";
import { getBCDataContext } from "../../../context/getBCData";
import { setDataContext } from '../../../context/setData'
import { operationContext } from "../../../context/handleUserOperation";
import { UserContext } from '../../../context/store'

export const ProviderWithdraw = (props) => {
  const { setModal } = useContext(modalContext);
  const { getWithdrawableAmount, getMoneyAddress } = useContext(getBCDataContext);
  const { withdrawMoney } = useContext(setDataContext)
  const { showResultToUser } = useContext(operationContext);
  const { globalState } = useContext(UserContext);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getWithdrawableAmount(globalState.user.address).then((res) => setAmount(res))
      .catch(() => setAmount(0))
  },[])

  const handleWithdraw = () => {
    const modalElement = (
      <WithdrwaModal
        getWithdrawableAmount={getWithdrawableAmount}
        getMoneyAddress={getMoneyAddress}
        withdrawMoney = {withdrawMoney}
        showResultToUser = {showResultToUser}
      />
    );
    setModal(modalElement);
  };
  return (
    <section className="ProviderWithDraw">
      <h1>Total withdrawable Amount:</h1>
      <p>
        {amount}
        <span>DOT</span>
      </p>

      <button onClick={handleWithdraw}>Withdraw</button>
    </section>
  );
};
