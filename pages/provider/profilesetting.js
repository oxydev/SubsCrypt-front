import React, { useState } from "react";

export default function ProfileSetting() {
  const [dat, setData] = useState({});
  return (
    <section className="ProfileSetting">
      <h1>Profile Setting</h1>
      <div className="row">
        <div className="Container--medium">
          <div className="ResetPassword">
            <h2>Change Password</h2>
            <form>
              <input
                className="CurrentPassField"
                type="text"
                required
                placeholder="Current Password"
                onChange={(e) => {
                  setData({ ...data, currentPassword: e.target.value });
                }}
              />
              <input
                className="NewPassField"
                type="text"
                required
                placeholder="New Password"
                onChange={(e) => {
                  setData({ ...data, newPassword: e.target.value });
                }}
              />
              <input
                className="NewPassField"
                type="text"
                required
                placeholder="Repeat the New Password"
                onChange={(e) => {
                  setData({ ...data, currentPasswordConfirm: e.target.value });
                }}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="Container--small"></div>
      </div>
    </section>
  );
}
