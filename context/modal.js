import React, { useState } from "react";

export const modalContext = React.createContext();

export const Modal = (props) => {
  const [modal, setModal] = useState(null);
  const [callBack, setCallBack] = useState(() => () => {
    console.log("close");
  });
  return (
    <modalContext.Provider value={{ modal, setModal, setCallBack }}>
      <>
        {props.children}
        <div className={modal ? "ModalContainer" : "ModalContainer hidden"}>
          {modal}
          <span
            className="Modal-closeBtn"
            onClick={() => {
              setModal(null);
              callBack();
            }}
          ></span>
        </div>
        <div
          className={modal ? "Filler" : "Filler hidden"}
          onClick={(e) => {
            setModal(null);
            callBack();
          }}
        ></div>
      </>
    </modalContext.Provider>
  );
};
