import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/store";

export const WithdrwaModal = (props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const { getWithdrawableAmount, getMoneyAddress } = props;
  const { globalState } = useContext(UserContext);

  const userAddress = globalState.user.address;

  const handleWithdraw = (e) => {
    e.preventDefault();
    console.log("Withdraw");
  };
  console.log(userAddress);
  useEffect(() => {
    getMoneyAddress(userAddress).then((res) => {
      setAddress(res);
    });
    getWithdrawableAmount(userAddress).then((res) => {
      setAmount(res);
    });
  }, []);
  return (
    <section className="WithDrawModal">
      <h1>Withdraw</h1>
      <form onSubmit={handleWithdraw}>
        <label>Wallet Address:</label>
        <input type="text" value={address} disabled />
        <label>Withdrawable Amount:</label>
        <div className="Amount">
          <input type="text" value={amount} disabled />
          <span className="Unit">DOT</span>
        </div>
        <input type="submit" value="Withdraw" />
      </form>
    </section>
  );
};
