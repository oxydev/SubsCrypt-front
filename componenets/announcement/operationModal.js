import React from "react";

export const OperationModal = (props) => {
  const { type, callBack } = props;
  return (
    <section className="OperationModal">
      <div>
        <h1>
          Operation{" "}
          {type == "successe" ? "Successfull!" : type == "notAllowed" ? "Not Allowed!" : "Failed!"}
        </h1>
        <p>
          The operation{" "}
          {type == "successe"
            ? "has been done Successfully"
            : type == "notAllowed"
            ? "is not allowed for you!"
            : "has not been doen successfully"}
        </p>
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
