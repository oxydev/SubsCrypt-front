import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Store";
import { setDataContext } from "../../context/setData";
import { getBCDataContext } from "../../context/getBCData";
import { useRouter } from "next/router";
import OperationModal from '../user/operationModal'
import { modalContext } from '../../context/modal'
import ValidateModal from './validateModal'
//The component for handling changing password part in profile setting
export default function ChangePassword(props) {
  const router = useRouter();
  const { type } = props;
  const [data, setData] = useState({});
  const { connectToWallet } = useContext(getBCDataContext);
  const { changePassword } = useContext(setDataContext);
  const { globalState, dispatch } = useContext(UserContext);
  const {setModal,setCallBack}=useContext(modalContext)

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
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          async function modal(){
            const modalElement=<OperationModal text={"The operation has been done successfully"}/>
            setModal(modalElement)
            await sleep(5000)
          }

          modal()
          txStatus = true;
          //convert alert by modal
          //window.alert("The operation has been done successfully");

        }
      });
      if (!txStatus) {
        //convert alert by modal
        //window.alert("The operation failed!");
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function modal() {
          const modalElement = <OperationModal text={"The operation failed!"}/>
          setModal(modalElement)
          await sleep(5000);
        }
        modal()
        // console.log("salam")
        // const modalElement = <OperationModal text={"The operation failed!"}/>
        // setModal(modalElement)
        // console.log("failed");
      }
    } else if (status.isFinalized) {
      // console.log("Finalized block hash", status.asFinalized.toHex());
    }
  }
  function handleSubmit(e) {
    if (data.newPassword !== data.currentPasswordConfirm) return;
    e.preventDefault();
    // console.log(data);
    changePassword(type, data.newPassword, callback);
  }

  useEffect(() => {
    if (!globalState.user.wallet) {
      connectToWallet(globalState.user.address).then((res) => {
        if(!res) {
          //convert alert by modal
          //window.alert("You are not allowed to do this operation!");
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          async function modal(){
            const modalElement=<ValidateModal text={"You are not allowed to do this operation!"}/>
            setModal(modalElement)
            await sleep(5000)
          }
           modal()
          //router.push("/");
        }else{
          dispatch({ type: 'LOAD_USER_WALLET', payload: res })
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
          placeholder="New Password"
          onChange={(e) => {
            setData({ ...data, newPassword: e.target.value });
          }}
        />
        <input
          className="NewPassField"
          type="password"
          required
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
