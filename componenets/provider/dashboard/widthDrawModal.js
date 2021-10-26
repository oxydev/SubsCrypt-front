import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/store";

export const WithdrwaModal = (props) => {
  const [address, setAddress] = useState("");

  const {
    withDrawAbleAmount,
    getMoneyAddress,
    withdrawMoney,
    showResultToUser,
  } = props;
  const { globalState } = useContext(UserContext);

  const userAddress = globalState.user.address;

  const callback = async ({ events = [], status }) => {
    if (status.isInBlock) {
      let check = false;
      for (const {
        event: { data, method, section },
        phase,
      } of events) {
        if (method === "ExtrinsicSuccess") check = true;
      }
      if (check === false) {
        await showResultToUser(
          "Operation failed!",
          "The operation has been failed!"
        );

        // await showResultToUser("Operation failed!", "The operation has been failed!");
      }
    } else if (status.isFinalized) {
      //todo finish and refresh
      // console.log("Finalized block hash", status.asFinalized.toHex());
    }
  };
  const handleWithdraw = (e) => {
    e.preventDefault();
    withdrawMoney(userAddress, callback).catch(async () => {
      await showResultToUser(
        "Operation failed!",
        "The operation has been failed!"
      );
    });
  };
  useEffect(() => {
    getMoneyAddress(userAddress)
      .then((res) => {
        setAddress(res);
      })
      .catch(async () => {
        await showResultToUser(
          "Operation failed!",
          "Unable to get the money address!"
        );
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
          <input type="text" value={withDrawAbleAmount} disabled />
          <span className="Unit">DOT</span>
        </div>
        <input type="submit" value="Withdraw" />
      </form>
    </section>
  );
};
