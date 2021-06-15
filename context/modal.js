import React, { useState } from "react";

export const modalContext = React.createContext();

export const Modal = (props) => {
  const [modal, setModal] = useState(null);

  return (
    <modalContext.Provider value={{ modal, setModal }}>
      <>
        {props.children}
        <div className={modal ? "ModalContainer" : "ModalContainer hidden"}>{modal}</div>
        <div className={modal ? "Filler" : "Filler hidden"}></div>
      </>
    </modalContext.Provider>
  );
};
