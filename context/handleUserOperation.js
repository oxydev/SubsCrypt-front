import React, { useContext } from "react";
import { modalContext } from "./modal";
import { OperationModal } from "../componenets/announcement/operationModal";

export const operationContext = React.createContext();

export const Operation = (props) => {
  const { setModal, setCallBack } = useContext(modalContext);

  const showResultToUser = async (title, message) => {
    let callback;
    const handleCallBack = () => {
      setModal(null);
      callback = true;
    };
    const successModal = (
      <OperationModal title={title} message={message} callBack={handleCallBack} />
    );
    setModal(successModal);
    setCallBack(() => () => {
      callback = true;
    });

    function ensureCallbackIsSet(timeout) {
      var start = Date.now();
      return new Promise(waitForCallback);
      function waitForCallback(resolve, reject) {
        if (callback) resolve(callback);
        else if (timeout && Date.now() - start >= timeout) reject(new Error("timeout"));
        else setTimeout(waitForCallback.bind(this, resolve, reject), 30);
      }
    }

    return ensureCallbackIsSet(60000)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const operationContextValue = {
    showResultToUser,
  };
  return (
    <operationContext.Provider value={operationContextValue}>
      {props.children}
    </operationContext.Provider>
  );
};
