import React from "react";

export const OperationModal = (props) => {
  const { title, message, callBack } = props;
  return (
    <section className="OperationModal">
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            callBack();
          }}
        >
          OK
        </button>
      </div>
    </section>
  );
};
