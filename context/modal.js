import React, { useState } from "react";

//Creating a function for handling modals and make it a context to be available all over the project
export const modalContext = React.createContext();

export const Modal = (props) => {
  const [modal, setModal] = useState(null);
  //call back is a function which is called after closing the mdoal
  const [callBack, setCallBack] = useState(() => () => {
    // console.log("close");
    // console.log(callBack);
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
