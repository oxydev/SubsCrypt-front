import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/store";
import { setDataContext } from "../../context/setData";
import { getBCDataContext } from "../../context/getBCData";
import { useRouter } from "next/router";
import { operationContext } from "../../context/handleUserOperation";

//The component for handling changing password part in profile setting
export default function ChangePassword(props) {
  const router = useRouter();
  const { type } = props;
  const [data, setData] = useState({});
  const { connectToWallet } = useContext(getBCDataContext);
  const { changePassword } = useContext(setDataContext);
  const { globalState, dispatch } = useContext(UserContext);
  const { showResultToUser } = useContext(operationContext);

  function callback({ events = [], status }) {
    // console.log("Transaction status:", status.type);

    if (status.isInBlock) {
      // console.log("Included at block hash", status.asInBlock.toHex());
      // console.log("Events:");
      // console.log(events);
      var txStatus = false;
      events.forEach(({ event: { data, method, section }, phase }) => {
        // console.log("\t", phase.toString(), `: ${section}.${method}`, data.toString());
        if (method === "ExtrinsicSuccess") {
          // console.log("success");
          txStatus = true;
          //todo please show that it changed successfully
        }
      });
      if (!txStatus) {
        // console.log("failed");
        //todo error
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
    }
  }
  function handleSubmit(e) {
    if (data.newPassword !== data.currentPasswordConfirm) return;
    e.preventDefault();
    // console.log(data);
    changePassword(type, data.newPassword, callback).catch(async () => {
      await showResultToUser("Operation faild!", "The operation has been failed!");
    });
  }

  useEffect(() => {
    if (!globalState.user.wallet) {
      connectToWallet(globalState.user.address).then(async (res) => {
        if (!res) {
          // window.alert("You are not allowed to do this operation!");
          await showResultToUser(
            "Operation Not Allowed!",
            "You are not allowed to do this operation!"
          ).then(() => {
            router.push("/");
          });
        } else {
          dispatch({ type: "LOAD_USER_WALLET", payload: res });
        }
      });
    }
  }, []);
  return (
    <div className="ResetPassword">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        {/* <input
          className="CurrentPassField"
          type="password"
          required
          placeholder="Current Password"
          onChange={(e) => {
            setData({ ...data, currentPassword: e.target.value });
          }}
        /> */}
        <input
          className="NewPassField"
          type="password"
          required
          autoComplete="on"
          placeholder="New Password"
          onChange={(e) => {
            setData({ ...data, newPassword: e.target.value });
          }}
        />
        <input
          className="NewPassField"
          type="password"
          required
          autoComplete="on"
          placeholder="Repeat the New Password"
          onChange={(e) => {
            setData({ ...data, currentPasswordConfirm: e.target.value });
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
