import React, { useState } from "react";

export default function ChangePassword(props) {
  const { type } = props;
  const [data, setData] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    if ((type = "provider")) {
      //codes for changing the provider password
    } else if ((type = "user")) {
      //codes for changing the user password
    }
  }
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
