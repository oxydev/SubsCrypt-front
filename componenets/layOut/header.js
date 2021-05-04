import React from "react";
import userData from "../../data/userIdentity.json";

export default function Header() {
  const user = userData.none;
  return (
    <div className="Header">
      <div className="LoginBox">
        <img className="Avatar" src={user.avatar} />
        <p className="UserName">{user.name}</p>
      </div>
      <div className="UserMenu">
        <div className="UserMenu-button"></div>
        <div className="UserMenu-menu"></div>
      </div>
    </div>
  );
}
