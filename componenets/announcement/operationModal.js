import React from "react";

export const OperationModal = (props) => {
  const { type, callBack } = props;
  return (
    <section className="OperationModal">
      <div>
        <h1>
          Operation{" "}
          {type == "successe"
            ? "Successfull!"
            : type == "notAllowed"
            ? "Not Allowed!"
            : type == "photoUpload" || "confirmPass"
            ? "Not Completed"
            : "Failed!"}
        </h1>
        <p>
          {" "}
          {type == "successe"
            ? "The operation has been done Successfully"
            : type == "notAllowed"
            ? "The operation is not allowed for you!"
            : type == "photoUpload"
            ? "Pleas upload your photo!"
            : type == "confirmPass"
            ? "Password has not been comfirmed correctly!"
            : "The operation has not been done successfully!"}
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
