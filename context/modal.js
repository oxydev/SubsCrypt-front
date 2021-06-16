import React, { useState } from "react";

export const modalContext = React.createContext();

export const Modal = (props) => {
  const [modal, setModal] = useState(null);

  return (
    <modalContext.Provider value={{ modal, setModal }}>
      <>
        {props.children}
        <div className={modal ? "ModalContainer" : "ModalContainer hidden"}>
          {modal}
          <span
            className="Modal-closeBtn"
            onClick={() => {
              setModal(null);
            }}
          ></span>
        </div>
        <div
          className={modal ? "Filler" : "Filler hidden"}
          onClick={(e) => {
            setModal(null);
          }}
        ></div>
      </>
    </modalContext.Provider>
  );
};
